import type { BlockWrapperProps } from "@/components/primitives/types";
import type { TBaseFieldProps } from "@/components/form/field/field.types";

export type TextAreaProps = Omit<BlockWrapperProps<"textarea", TBaseFieldProps>, 'as'>;