import { Children, cloneElement, Fragment, type ReactNode } from "react";
import { isNonEmptyString, isNullish, isReactElementWithChildren } from "@/lib/utils/guards";

/**
 * Wraps string children in a <span> so layout primitives (Row, Inline, etc.)
 * can apply spacing (gap) consistently.
 *
 * Non-string children are returned unchanged.
 */
export function wrapTextChildren(children: ReactNode): ReactNode {
  if (isNonEmptyString(children) || typeof children === "number") {
    return children;
  }
  if (
    Array.isArray(children) &&
    children.length === 1 &&
    (typeof children[0] === "string" ||
      typeof children[0] === "number")
  ) {
    return children;
  }

  if (isReactElementWithChildren(children) && children.type === Fragment &&
    (typeof children.props.children === "string" ||
      typeof children.props.children === "number")
  ) {
    return children;
  }

  let wrappingNeeded = false;

  const mapped = Children.map(children, (child) => {
    // Nullish or boolean → preserved exactly
    if (
      isNullish(child) ||
      typeof child === "boolean"
    ) {
      return child;
    }

    // Text node or number → wrapping needed
    if (isNonEmptyString(child) || typeof child === "number") {
      wrappingNeeded = true;
      return <span>{child}</span>;
    }

    // Array → recurse
    if (Array.isArray(child)) {
      const result = wrapTextChildren(child);
      if (result !== child) wrappingNeeded = true;
      return result;
    }

    // React element → maybe a fragment
    if (isReactElementWithChildren(child)) {
      if (child.type === Fragment) {
        const inner = wrapTextChildren(child.props.children);
        if (inner !== child.props.children) wrappingNeeded = true;
        return cloneElement(child, child.props, inner);
      }

      return child; // Any other element stays untouched
    }

    // Unknown node → leave untouched
    return child;
  });

  // If no wrapping was required, return the original children
  return wrappingNeeded ? mapped : children;
}