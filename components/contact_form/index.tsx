'use client'
import Button from '@/components/button'
import List from '@/components/list';
import Link from '@/components/link';
import { RiMailLine } from '@remixicon/react';
import { TextArea, TextInput } from '@/components/form/inputs';
import { Block, Stack } from '@/components/primitives';
import { useServerValidatedForm } from '@/lib/hooks/useServerValidatedForm';
import { handleContact } from '@/app/actions/contact';
import Image from '@/components/image';

const initialState = {
    status: "idle" as const,
    fieldErrors: {},
    formErrors: [],
};

export default function ContactForm() {
    const { formRef, state, pending, getError, deleteError, handleSubmit } = useServerValidatedForm(handleContact, initialState);

    function getStatus() {
        if (state.formErrors.length > 0) return "error";
        if (state.status === "unknown_error") return "error";
        if (state.status === "success") return "success";
        return "idle";
    }

    const derivedStatus = getStatus();
    const statusVariant = derivedStatus === "success" ? "success" : derivedStatus === "error" ? "danger" : "neutral";
    const statusPaint = derivedStatus === 'idle' ? undefined : "all";

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

    return (
        <form
            ref={formRef}
            className="contact-form width-full mr-auto p-2"
            onSubmit={handleSubmit}
            noValidate
        >
            <Block
                as="fieldset"
                className="contact-form__fieldset surface-frame p-4"
                variant='primary'
                variantAppearance='outlined'
                paint={"all"}
            >
                <legend className="contact-form__legend">Contact Me</legend>

                <Block
                    role="status"
                    aria-live="polite"
                    aria-atomic="true"
                    data-status={derivedStatus}
                    className="contact-form__status p-8"
                    paint={statusPaint}
                    variant={statusVariant}
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
                        errorMessage={getError("name")}
                        onChange={deleteError}
                    />
                    <TextInput
                        id="contact-email"
                        label="Email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        errorMessage={getError("email")}
                        onChange={deleteError}
                    />
                    <TextArea
                        id="contact-message"
                        label="Message"
                        name="message"
                        rows={5}
                        required
                        errorMessage={getError("message")}
                        onChange={deleteError}
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
            </Block>
        </form>
    )
}