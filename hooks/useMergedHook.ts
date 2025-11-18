import { useCallback, type RefObject, type Ref } from "react";

/**
 * Merges an internal ref with an optional external ref into a single callback ref.
 * 
 * This hook is useful when a component needs to maintain its own ref for internal
 * functionality (like event handlers or measurements) while also allowing users
 * to pass their own ref to access the element.
 * 
 * @template T - The type of the DOM element being referenced
 * @param internalRef - The component's internal ref object, used for internal logic
 * @param externalRef - Optional user-provided ref (can be a callback or ref object)
 * @returns A callback ref that updates both internal and external refs
 * 
 * @example
 * ```tsx
 * function MyComponent({ ref: externalRef }) {
 *   const internalRef = useRef<HTMLDivElement>(null);
 *   const mergedRef = useMergedRef(internalRef, externalRef);
 *   
 *   // Use internalRef for internal logic
 *   useEffect(() => {
 *     internalRef.current?.focus();
 *   }, []);
 *   
 *   return <div ref={mergedRef}>Content</div>;
 * }
 * ```
 */
export function useMergedRef<T>(
  internalRef: RefObject<T | null>,
  externalRef?: Ref<T>
) {
  return useCallback(
    (node: T | null) => {
      // internal ref (hook behavior depends on this)
      internalRef.current = node;

      // external ref (user's ref)
      if (externalRef) {
        if (typeof externalRef === "function") {
          externalRef(node);
        } else if ("current" in externalRef) {
          (externalRef as React.MutableRefObject<T | null>).current = node;
        }
      }
    },
    [externalRef] // internalRef never changes
  );
}