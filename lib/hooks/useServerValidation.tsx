'use client'

import { type ChangeEvent, type FormEvent, startTransition, useActionState, useEffect, useRef, useState } from 'react'
import { isNonEmptyString } from '@/lib/utils/guards'

type ServerAction<TState> = (
  prevState: Awaited<TState>,
  formData: FormData
) => TState | Promise<TState>;

export function useServerValidatedForm
  <TState extends {
    status: string
    fieldErrors: Record<string, string>
  }
  >(
    action: ServerAction<TState>,
    initialState: Awaited<TState>
  ) {
  const [state, formAction, pending] =
    useActionState(action, initialState);

  const formRef = useRef<HTMLFormElement>(null);

  const [visibleErrors, setVisibleErrors] = useState<Map<string, string>>(new Map());

  // Sync server field errors → visible errors
  useEffect(() => {
    const entries = Object.entries(state.fieldErrors)
      .filter(([, msg]) => isNonEmptyString(msg))

    if (entries.length === 0) return;

    setVisibleErrors(new Map(entries));
  }, [state.fieldErrors])

  // Reset on success
  useEffect(() => {
    if (state.status === 'success') {
      formRef.current?.reset();
      setVisibleErrors(new Map());
    }
  }, [state.status])

  function getError(name: string) {
    return visibleErrors.get(name);
  }

  function deleteError(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name } = e.currentTarget;

    setVisibleErrors(prev => {
      if (!prev.has(name)) return prev;

      const next = new Map(prev);
      next.delete(name);
      return next;
    });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(() => {
      formAction(formData);
    });
  }

  return {
    formRef,
    state,
    pending,
    visibleErrors,
    getError,
    deleteError,
    handleSubmit,
  }
}
