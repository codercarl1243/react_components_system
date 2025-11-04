import { useActionState } from 'react'
import Button from '@/components/button'
import { handleContact } from '@/app/actions/contact';


export default function ContactForm() {
  const [state, formAction, pending] = useActionState(handleContact, {
    status: "idle",
    errors: [],
  });

    return (
        <form className="contact-form" action={formAction} noValidate>
            <fieldset className="contact-form__fieldset">
                <legend className="contact-form__legend">Contact us</legend>

                <div
                    role="region"
                    aria-live="polite"
                    aria-label="Form errors"
                    className="contact-form__errors"
                >
                    {state.errors.length > 0 && (
                        <ul>
                            {state.errors.map((error, index) => (
                                <li key={`error-${index}`}>{error}</li>
                            ))}
                        </ul>
                    )}
                </div>

                <div>
                    <label className="contact-form__label" htmlFor="contact-name">
                        Name
                    </label>
                    <input
                        id="contact-name"
                        name="name"
                        type="text"
                        className="contact-form__input"
                        autoComplete="name"
                        aria-invalid={state.errors.some(e => e.toLowerCase().includes("name"))}
                        required
                    />
                </div>

                <div>
                    <label className="contact-form__label" htmlFor="contact-email">
                        Email
                    </label>
                    <input
                        id="contact-email"
                        name="email"
                        type="email"
                        className="contact-form__input"
                        autoComplete="email"
                        aria-invalid={state.errors.some(e => e.toLowerCase().includes("email"))}
                        required
                    />
                </div>

                <label className="contact-form__label" htmlFor="contact-message">
                    Message
                    <textarea
                        id="contact-message"
                        name="message"
                        className="contact-form__textarea"
                        rows={4}
                        aria-invalid={state.errors?.some(e => e.toLowerCase().includes("message"))}
                        required
                    />
                </label>

                <Button type="submit" data-variant="primary" isLoading={pending}>
                    Send message
                </Button>
            </fieldset>
        </form>
    )
}