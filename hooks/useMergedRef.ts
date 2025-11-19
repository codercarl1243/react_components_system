import { useCallback, useRef, type RefObject, type Ref } from "react";

/**
 * Merges an external user-provided ref with an internal ref into a single callback ref.
 * 
 * This hook is useful when a component needs to maintain its own ref for internal
 * functionality (like event handlers or measurements) while also allowing users
 * to pass their own ref to access the element.
 * 
 * If no internal ref is provided, one will be created automatically.
 * 
 * @template T - The type of the DOM element being referenced
 * @param externalRef - Optional user-provided ref (can be a callback or ref object)
 * @param internalRef - Optional internal ref for component logic. If not provided, one is created.
 * @returns A callback ref that updates both internal and external refs
 * 
 * @example
 * ```tsx
 * // Simple usage - creates internal ref automatically
 * function MyComponent({ ref: externalRef }) {
 *   const mergedRef = useMergedRef(externalRef);
 *   return <div ref={mergedRef}>Content</div>;
 * }
 * 
 * // Advanced usage - provide your own internal ref
 * function MyComponent({ ref: externalRef }) {
 *   const internalRef = useRef<HTMLDivElement>(null);
 *   const mergedRef = useMergedRef(externalRef, internalRef);
 *   
 *   useEffect(() => {
 *     internalRef.current?.focus();
 *   }, []);
 *   
 *   return <div ref={mergedRef}>Content</div>;
 * }
 * ```
 */
export function useMergedRef<T>(
    externalRef?: Ref<T | null>,
    internalRef?: RefObject<T | null>
): (node: T | null) => void {
    const createdRef = useRef<T | null>(null);
    const refToUse = internalRef ?? createdRef;

    return useCallback(
        (node: T | null) => {
            // Update internal ref (component's own ref)
            refToUse.current = node;

            // Update external ref if provided (user's ref)
            if (externalRef) {
                if (typeof externalRef === "function") {
                    externalRef(node);
                } else if (externalRef && "current" in externalRef) {
                    externalRef.current = node;
                }
            }
        },
        [externalRef] // refToUse is stable
    );
}