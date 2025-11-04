"use server";

import { AppErrorCode } from "@/lib/logging/errorCodes";
import { logInfo } from "@/lib/logging/log";
import { logAppError } from "@/lib/logging/logAppError";
import { z } from "zod";

const ContactSchema = z.object({
    name: z.string().trim().min(1, "Name is required."),
    email: z.email("Please enter a valid email.").trim(),
    message: z.string().trim().min(1, "Message is required."),
});

export async function handleContact(_: any, formData: FormData){
    const result = ContactSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
    });

    if (!result.success) {
        return {
            status: "error",
            errors: result.error.issues.map(i => ({
                field: i.path[0],
                message: i.message
            }))
        };
    }

    const { name, email, message } = result.data;

    try {
        logInfo("📩 Contact submission:", {
            context: "contact form",
            data: { name, email, message }
        });

        formData.append("access_key", "ffd7c506-c409-4ffc-bbfb-4f5ddbfceaf9");

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (response.ok && data.success) {
            return {
                status: "success",
                message: "Your message has been sent successfully!",
                errors: []
            };
        }
        return {
            status: "error",
            errors: [data.message ?? "Something went wrong. Please try again later."],
        };

    } catch (err) {
        logAppError(AppErrorCode.EXTERNAL_SERVICE_ERROR, "web3forms error", { context: "contact form", data: { error: err }, trace: true })

        return {
            status: "error",
            errors: [
                err instanceof Error
                    ? err.message
                    : "An unexpected error occurred. Please try again later.",
            ],
        };
    }
}