"use server";

import { AppErrorCode } from "@/lib/logging/errorCodes";
import { logInfo } from "@/lib/logging/log";
import { logAppError } from "@/lib/logging/logAppError";
import { z } from "zod";

type ContactFields = "name" | "email" | "message";

export type ContactActionState = {
    status: "idle" | "success" | "error";
    message?: string;
    fieldErrors: Partial<Record<ContactFields, string>>;
    formErrors: string[];
};

const ContactSchema = z.object({
    name: z.string().trim().min(1, "Name is required."),
    email: z.email("Please enter a valid email.").trim(),
    message: z.string().trim().min(1, "Message is required."),
});

export async function handleContact(_: any, formData: FormData): Promise<ContactActionState> {

    const result = ContactSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
    });

    if (!result.success) {
        const fieldErrors = result.error.issues.reduce<Partial<Record<ContactFields, string>>>(
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
            formErrors: [],
        };
    }

    const { name, email, message } = result.data;

    try {
        logInfo("📩 Contact submission:", {
            context: "contact form",
            data: { name, email, message }
        });
        const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

        if (!accessKey) {
            throw new Error("WEB3FORMS_ACCESS_KEY is not set in environment variables.");
        }

        formData.append("subject", "New contact form submission");
        formData.append("access_key", accessKey);

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (response.ok && data?.success) {
            return {
                status: "success",
                message: "Your message has been sent successfully!",
                fieldErrors: {},
                formErrors: [],
            };
        }

        return {
            status: "error",
            fieldErrors: {},
            formErrors: [data?.message ?? "Something went wrong. Please try again later."],
        };

    } catch (err) {
        logAppError(AppErrorCode.EXTERNAL_SERVICE_ERROR, "web3forms error", { context: "contact form", data: { error: err }, trace: true })

        return {
            status: "error",
            fieldErrors: {},
            formErrors: [
                err instanceof Error
                    ? err.message
                    : "Network error. Please try again later.",
            ],
        };
    }
}