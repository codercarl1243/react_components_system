"use server";

import { AppErrorCode } from "@/lib/logging/errorCodes";
import { logInfo } from "@/lib/logging/log";
import { logAppError } from "@/lib/logging/logAppError";
import { z } from "zod";
import { Resend } from 'resend';

type ContactFields = "name" | "email" | "message";

export type ContactActionState = {
    status: "idle" | "success" | "error" | "unknown_error";
    message?: string;
    fieldErrors: Partial<Record<ContactFields, string>>;
    formErrors: string[];
};

interface ContactResponse {
    success: boolean;
    message?: string;
    errors?: { field?: string; message: string }[];
}

const ContactSchema = z.object({
    name: z.string().trim().min(1, "Name is required."),
    email: z.email("Please enter a valid email.").trim(),
    message: z.string().trim().min(1, "Message is required."),
});

export async function handleContact(prevState: ContactActionState, formData: FormData): Promise<ContactActionState> {
    let formErrors: ContactActionState['formErrors'] = [];
    let fieldErrors: ContactActionState['fieldErrors'] = {};

    const result = ContactSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
    });

    if (!result.success) {
        fieldErrors = result.error.issues.reduce<Partial<Record<ContactFields, string>>>(
            (acc, issue) => {
                const field = issue.path[0];
                if (field === "name" || field === "email" || field === "message") {
                    acc[field] = issue.message;
                }
                return acc;
            },
            {}
        );

        return {
            status: "error",
            fieldErrors,
            formErrors,
        };
    }

    const { name, email, message } = result.data;

    try {
        logInfo("📩 Contact submission:", {
            context: "contact form",
            data: { name, email, message }
        });
        const accessKey = process.env.RESEND_ACCESS_KEY;

        if (!accessKey) {
            throw new Error("WEB3FORMS_ACCESS_KEY is not set in environment variables.");
        }

        formData.append("subject", "New contact form submission");
        formData.append("access_key", "ffd7c506-c409-4ffc-bbfb-4f5ddbfceaf9");

        const resend = new Resend(accessKey);

        const { data, error } = await resend.emails.send({
            from: "Contact Form <onboarding@resend.dev>",
            to: 'codercarl1243@gmail.com',
            subject: "New contact form submission",
            html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h2 style="margin-top: 0; color: #111827;">New Contact Form Submission</h2>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin-bottom: 24px;" />
            
            <p style="margin: 0 0 4px; font-size: 12px; text-transform: uppercase; color: #6b7280; letter-spacing: 0.05em;">Name</p>
            <p style="margin: 0 0 20px; font-size: 16px; color: #111827;">${name}</p>

            <p style="margin: 0 0 4px; font-size: 12px; text-transform: uppercase; color: #6b7280; letter-spacing: 0.05em;">Email</p>
            <p style="margin: 0 0 20px; font-size: 16px; color: #111827;">
                <a href="mailto:${email}" style="color: #2563eb;">${email}</a>
            </p>

            <p style="margin: 0 0 4px; font-size: 12px; text-transform: uppercase; color: #6b7280; letter-spacing: 0.05em;">Message</p>
            <p style="margin: 0; font-size: 16px; color: #111827; white-space: pre-wrap;">${message}</p>
        </div>
    `,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        });

        if (error) {
            formErrors = [error.message ?? "Something went wrong. Please try again later."];
            return {
                status: "error",
                fieldErrors,
                formErrors
            };
        }

        if (data?.id) {
            return {
                status: "success",
                message: "Your message has been sent successfully!",
                fieldErrors,
                formErrors
            };
        }

        formErrors = ["Something went wrong. Please try again later."];
        return {
            status: "unknown_error",
            fieldErrors,
            formErrors
        };

    } catch (err) {
        logAppError(AppErrorCode.EXTERNAL_SERVICE_ERROR, "web3forms error", { context: "contact form", data: { error: err }, trace: true })

        return {
            status: "unknown_error",
            fieldErrors,
            formErrors,
        };
    }
}