import type { PaintChannel, PaintPreset } from "@/types/paint";
import type { Variant, VariantAppearance } from "@/types/variant";

// The demo allows an empty string of ‘', but the real typing does not.
export type ExampleAppearance = VariantAppearance | '';
export type ExampleVariant = Variant | '';
export type ExamplePaint = PaintPreset | PaintChannel | '';

export type PaintState = {
    variant?: ExampleVariant;
    appearance?: ExampleAppearance;
    paint: ExamplePaint;
}

export type PaintMessage = {
    id: string;
    when: (state: PaintState) => boolean;
    tone: "info" | "warning";
    title: string;
    body: string[] | ((state: PaintState) => string[]);
};