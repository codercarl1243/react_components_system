'use client'
import { type ChangeEvent, useActionState, useEffect, useRef, useState } from 'react'
import Button from '@/components/button'
import { handleContact } from '@/app/actions/contact';
import List from '@/components/list';
import Link from '@/components/link';
import { RiMailLine } from '@remixicon/react';
import { TextArea, TextInput } from '@/components/form/inputs';
import { Block, Stack } from '@/components/primitives';
import { isNullish } from '@/lib/utils/guards';

const initialState = {
    status: "idle" as const,
    fieldErrors: {},
    formErrors: [],
};

export default function ContactForm() {
    const [state, formAction, pending] = useActionState(handleContact, initialState);
    const formRef = useRef<HTMLFormElement>(null);
    const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("")

    function markTouched(name: string) {
        setTouchedFields(prev => ({ ...prev, [name]: true }));
    }

    function handleSetName(e: ChangeEvent<HTMLInputElement>) {
         if (isNullish(e.currentTarget.value)) return;
        markTouched("name")
        setName(e.currentTarget.value);
    }
    function handleSetEmail(e: ChangeEvent<HTMLInputElement>) {
        if (isNullish(e.currentTarget.value)) return;
        markTouched("email")
        setEmail(e.currentTarget.value);
    }
    function handleSetMessage(e: ChangeEvent<HTMLTextAreaElement>) {
         if (isNullish(e.currentTarget.value)) return;
        markTouched("message")
        setMessage(e.currentTarget.value);
    }

    useEffect(() => {
        if (state.status === "success") {
            formRef.current?.reset();
        }
    }, [state.status]);


    function getStatus() {
        if (state.formErrors.length > 0) return "error";
        if (state.status === "unknown_error") return "error";
        if (state.status === "success") return "success";
        return "idle";
    }

    const derivedStatus = getStatus();

    function renderStatus() {
        if (state.status === "success") {
            return (
                <p className="contact-form__success">{state.message}</p>
            )
        }
        if (state.status === "unknown_error") {
            return (
                <>
                    <p>
                        Something went wrong while sending your message.
                    </p>
                    <p>
                        Please try again later, or <em>contact me directly</em> at <Link href="mailto:codercarl1243@gmail.com">codercarl1243@gmail.com</Link>.
                    </p>
                </>
            )
        }
        if (state.formErrors.length > 0) {
            return (
                <List
                    as="ul"
                    className="contact-form__errors"
                    aria-label="Form errors"
                    marker='none'
                >
                    {state.formErrors.map((error, index) => (
                        <li key={`form-error-${index}`}>{error}</li>
                    ))}
                </List>
            )
        }

        return null;
    }

    function handleSubmit(formData: FormData){
        setTouchedFields({});
        formAction(formData)
    }

    return (
        <form ref={formRef} className="contact-form" action={handleSubmit} noValidate>
            <fieldset className="contact-form__fieldset">
                <legend className="contact-form__legend">Contact Me</legend>

                <Block
                    role="status"
                    aria-live="polite"
                    aria-atomic="true"
                    data-status={derivedStatus}
                    className="contact-form__status"
                    paint={derivedStatus === 'idle' ? undefined : "all"}
                    variant={derivedStatus === "success" ? "success" : derivedStatus === "error" ? "danger" : "neutral"}
                    variantAppearance='tonal'
                >
                    {renderStatus()}
                </Block>

                <Stack gap={2}>
                    <TextInput
                        id="contact-name"
                        label="Name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        errorMessage={touchedFields.name ? undefined : state.fieldErrors.name}
                        value={name}
                        onChange={handleSetName}
                    />
                    <TextInput
                        id="contact-email"
                        label="Email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        errorMessage={touchedFields.email ? undefined : state.fieldErrors.email}
                        value={email}
                        onChange={handleSetEmail}
                    />
                    <TextArea
                        id="contact-message"
                        label="Message"
                        name="message"
                        rows={5}
                        required
                        errorMessage={touchedFields.message ? undefined : state.fieldErrors.message}
                        value={message}
                        onChange={handleSetMessage}
                    />
                </Stack>

                <Button
                    icon={RiMailLine}
                    type="submit"
                    variant="primary"
                    variantAppearance={"filled"}
                    isLoading={pending}>
                    Send message
                </Button>
            </fieldset>
        </form>
    )
}