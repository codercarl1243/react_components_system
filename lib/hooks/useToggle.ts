import { useState } from "react";

type UseToggleReturn = {
    value: boolean;
    toggle: () => void;
    setOn: () => void;
    setOff: () => void;
    set: (next: boolean) => void;
};

/**
 * **useToggle**
 *
 * A small utility hook for managing boolean UI state.
 *
 * This hook provides a _boolean_ value along with a set of expressive helpers
 * for toggling or explicitly setting the state. 
 * 
 * It is intentionally generic and UI-agnostic, making it suitable 
 * for use across many interaction patterns
 * (toggles, disclosures, panels, feature flags, etc.).
 *
 * **Usage**
 *
 * ```tsx
 * const sidebar = useToggle();
 *
 * <Button onClick={sidebar.toggle}>
 *   {sidebar.value ? "Hide" : "Show"} sidebar
 * </Button>
 * ```
 *
 * Or with a ToggleButton:
 *
 * ```tsx
 * const preview = useToggle();
 *
 * <Toggle
 *   pressed={preview.value}
 *   onClick={preview.toggle}
 * >
 *   Preview
 * </Toggle>
 * ```
 *
 * ## Parameters
 * @param initial - Optional initial state (defaults to `false`)
 *
 * ## Returns
 * An object containing:
 * - `value`   — The current boolean state
 * - `toggle`  — Inverts the current state
 * - `setOn`   — Sets the state to `true`
 * - `setOff`  — Sets the state to `false`
 * - `set`     — Explicitly sets the state to a provided boolean
 */

export function useToggle(initial = false): UseToggleReturn {
    const [value, setValue] = useState(initial);

    const toggle = () => setValue(prev => !prev);
    const setOn = () => setValue(true);
    const setOff = () => setValue(false);
    const set = (next: boolean) => setValue(next);

    return {
        value,
        toggle,
        setOn,
        setOff,
        set,
    };
}
