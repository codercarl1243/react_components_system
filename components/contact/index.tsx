'use client'
import { useActionState, useEffect, useRef } from 'react'
import Button from '@/components/button'
import { handleContact } from '@/app/actions/contact';
import List from '@/components/list';


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


    return (
        <form ref={formRef} className="contact-form" action={formAction} noValidate>
            <fieldset className="contact-form__fieldset">
                <legend className="contact-form__legend">Contact us</legend>

                <div
                    role="status"
                    aria-live="polite"
                    aria-atomic="true"

                    className="contact-form__status"
                >
                    {state.status === "success" && (
                        <p className="contact-form__success">{state.message}</p>
                    )}

                    {state.formErrors.length > 0 && (
                        <List
                            className="contact-form__errors"
                            aria-label="Form errors"
                        >
                            {state.formErrors.map((error, index) => (
                                <li key={`form-error-${index}`}>{error}</li>
                            ))}
                        </List>
                    )}
                </div>

                {/* Name */}
                <div className="contact-form__field">
                    <label className="contact-form__label" htmlFor="contact-name">
                        Name
                    </label>
                    <input
                        id="contact-name"
                        name="name"
                        type="text"
                        className="contact-form__input"
                        autoComplete="name"
                        required
                        aria-invalid={!!state.fieldErrors.name}
                        aria-describedby={state.fieldErrors.name ? "contact-name-error" : undefined}
                    />
                    {state.fieldErrors.name && (
                        <p id="contact-name-error" className="contact-form__error">
                            {state.fieldErrors.name}
                        </p>
                    )}
                </div>

                {/* Email */}
                <div className="contact-form__field">
                    <label className="contact-form__label" htmlFor="contact-email">
                        Email
                    </label>
                    <input
                        id="contact-email"
                        name="email"
                        type="email"
                        className="contact-form__input"
                        autoComplete="email"
                        required
                        aria-invalid={!!state.fieldErrors.email}
                        aria-describedby={state.fieldErrors.email ? "contact-email-error" : undefined}
                    />
                    {state.fieldErrors.email && (
                        <p id="contact-email-error" className="contact-form__error">
                            {state.fieldErrors.email}
                        </p>
                    )}
                </div>

                {/* Message */}
                <div className="contact-form__field">
                    <label className="contact-form__label" htmlFor="contact-message">
                        Message
                    </label>
                    <textarea
                        id="contact-message"
                        name="message"
                        className="contact-form__textarea"
                        rows={4}
                        required
                        aria-invalid={!!state.fieldErrors.message}
                        aria-describedby={state.fieldErrors.message ? "contact-message-error" : undefined}
                    />
                    {state.fieldErrors.message && (
                        <p id="contact-message-error" className="contact-form__error">
                            {state.fieldErrors.message}
                        </p>
                    )}
                </div>

                <Button type="submit" data-variant="primary" data-style={"filled"} isLoading={pending}>
                    Send message
                </Button>
            </fieldset>
        </form>
    )
}