import TextInput from "@/components/form/inputs/textInput";
import type { TextInputProps } from "@/components/form/inputs/input.type";

const Text = (props: Omit<TextInputProps<'input'>, "as">) => (
  <TextInput {...props} as="input" />
);

const TextArea = (props: Omit<TextInputProps<'textarea'>, "as">) => (
  <TextInput {...props} as="textarea" />
);

export { TextInput, Text, TextArea };