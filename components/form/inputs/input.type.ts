import { InputHTMLAttributes, TextareaHTMLAttributes, ReactNode } from "react";

export type textElementType = "input" | "textarea";

export type TElementMap = {
  input: InputHTMLAttributes<HTMLInputElement>;
  textarea: TextareaHTMLAttributes<HTMLTextAreaElement>;
};

export type TBaseInputProps<T extends textElementType> = {
  id: string;
  label?: ReactNode;
  error?: ReactNode;
  as?: T;
};

export type TextInputProps<T extends textElementType> = TBaseInputProps<T> & TElementMap[T];