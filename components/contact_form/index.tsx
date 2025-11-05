'use client'
import { useActionState, useEffect, useRef } from 'react'
import Button from '@/components/button'
import { handleContact } from '@/app/actions/contact';
import List from '@/components/list';
import clsx from 'clsx';
import Link from '@/components/link';
import { RiMailLine } from '@remixicon/react';
import { Text, TextArea } from '@/components/form/inputs';

// 🧪 TEMP: Fake error state for testing layout
const fakeErrorState = {
    status: "unknown_error",
    message: "",
    fieldErrors: {
        name: "Name is required.",
        email: "Please enter a valid email address.",
        message: "Message must be at least 10 characters long.",
    },
    formErrors: [
    ],
};

const fakeSuccessState = {
    status: "success",
    message: "✅ Your message has been sent successfully!",
    fieldErrors: {},
    formErrors: [],
};

const initialState = {
    status: "idle" as const,
    fieldErrors: {},
    formErrors: [],
};

export default function ContactForm() {
    const [state, formAction, pending] = useActionState(handleContact, fakeErrorState);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (state.status === "success") {
            formRef.current?.reset();
        }
    }, [state.status]);


    return (
        <form ref={formRef} className="contact-form" action={formAction} noValidate>
            <fieldset className="contact-form__fieldset">
                <legend className="contact-form__legend">Contact Me</legend>

                <div
                    role="status"
                    aria-live="polite"
                    aria-atomic="true"

                    className={clsx("contact-form__status",
                        { "contact-form__status--error": (state.formErrors.length > 0 || state.status === "unknown_error") },
                        { "contact-form__status--success": state.status === "success" }
                    )

                    }
                >
                    {state.status === "success" && (
                        <p className="contact-form__success">{state.message}</p>
                    )}

                    {state.formErrors.length > 0 && (
                        <List
                            className="contact-form__errors"
                            aria-label="Form errors"
                            variant='none'
                        >
                            {state.formErrors.map((error, index) => (
                                <li key={`form-error-${index}`}>{error}</li>
                            ))}
                        </List>
                    )}
                    {state.status === "unknown_error" && (
                        <>
                            <p>Something went wrong while sending your message.</p>
                            <p>
                                Please try again later, or contact me directly at <Link href="mailto:codercarl1243@gmail.com">codercarl1243@gmail.com</Link>.
                            </p>
                        </>
                    )}
                </div>

                <Text
                    id="contact-name"
                    label="Name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    error={state.fieldErrors.name}
                />
                <Text
                    id="contact-email"
                    label="Email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    error={state.fieldErrors.email}
                />
                <TextArea
                    id="contact-message"
                    label="Message"
                    name="message"
                    rows={5}
                    required
                    error={state.fieldErrors.message}
                />

                <Button
                    icon={RiMailLine}
                    type="submit"
                    data-variant="primary"
                    data-style={"filled"}
                    isLoading={pending}>
                    Send message
                </Button>
            </fieldset>
        </form>
    )
}