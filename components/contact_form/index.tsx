'use client'
import { useActionState, useEffect, useRef } from 'react'
import Button from '@/components/button'
import { handleContact } from '@/app/actions/contact';
import List from '@/components/list';
import Link from '@/components/link';
import { RiMailLine } from '@remixicon/react';
import { Text, TextArea } from '@/components/form/inputs';


const initialState = {
    status: "idle" as const,
    fieldErrors: {},
    formErrors: [],
};

export default function ContactForm() {
    const [state, formAction, pending] = useActionState(handleContact, initialState);
    const formRef = useRef<HTMLFormElement>(null);

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
                        Please try again later, or contact me directly at <Link href="mailto:codercarl1243@gmail.com">codercarl1243@gmail.com</Link>.
                    </p>
                </>
            )
        }
        if (state.formErrors.length > 0) {
            return (
                <List
                    className="contact-form__errors"
                    aria-label="Form errors"
                    variant='none'
                >
                    {state.formErrors.map((error, index) => (
                        <li key={`form-error-${index}`}>{error}</li>
                    ))}
                </List>
            )
        }

        return null;
    }

    return (
        <form ref={formRef} className="contact-form" action={formAction} noValidate>
            <fieldset className="contact-form__fieldset">
                <legend className="contact-form__legend">Contact Me</legend>

                <div
                    role="status"
                    aria-live="polite"
                    aria-atomic="true"
                    data-status={derivedStatus}
                    className="contact-form__status"
                >
                    {renderStatus()}
                </div>

                <div className="flow-4">
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
                </div>

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