import clsx from "clsx";
import Button from "..";
import type { ToggleButtonProps } from "../button.type";

/**
 * ToggleButton
 *
 * A controlled toggle button built on top of the base `Button` component.
 *
 * This component represents a binary on/off UI state using a native `<button>`
 * element and the `aria-pressed` attribute. It is intended for **UI state toggles**,
 * not form submission or data entry.
 *
 * ## Accessibility
 * - Uses a real `<button>` element (native keyboard and focus behavior)
 * - Exposes state via `aria-pressed`
 * - Screen readers announce the button as “pressed” / “not pressed”
 * - Does **not** use radio or checkbox semantics
 *
 * ## State Management
 * - **Controlled by design**
 * - The `pressed` prop is the single source of truth
 * - Consumers must update state via `onClick`
 *
 * ## Styling
 * - Visual state should be derived from `[aria-pressed="true"]`
 * - No internal state or data attributes are required
 *
 * ## When to Use
 * - View mode toggles (e.g. Preview / Code)
 * - Theme or layout switches
 * - Filter or display controls
 *
 * ## When NOT to Use
 * - Form inputs (use `RadioGroup` or `CheckboxGroup`)
 * - Values that should be submitted with a form
 *
 * @component
 *
 * @example
 * ```tsx
 * const [active, setActive] = useState(false);
 *
 * <ToggleButton
 *   pressed={active}
 *   onClick={() => setActive(v => !v)}
 * >
 *   Preview
 * </ToggleButton>
 * ```
 */
export default function Toggle({ pressed, toggleLabel, className, ...props }: ToggleButtonProps) {

    return (
        <Button
            className={clsx("toggle-button", className)}
            aria-pressed={pressed}
            type="button"
            {...props}
        >{toggleLabel}</Button>
    )
}