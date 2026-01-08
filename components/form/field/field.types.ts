import type { ComponentPropsWithRef, ReactNode } from "react";

export type TBaseFieldProps = {
  label: ReactNode;
  helper?: ReactNode;
  errorMessage?: string;
};

export type FormFieldWrapperProps = {
  inputId: string;
  required?: boolean;
}
  & TBaseFieldProps
  & ComponentPropsWithRef<'div'>;