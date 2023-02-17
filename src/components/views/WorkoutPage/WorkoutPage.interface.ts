import type { ReactNode, Ref } from 'react';

export type TextInputProps = JSX.IntrinsicElements['input'] & {
  label?: string;
  error?: string;
  helperText?: string;
};

export interface InputWrapperProps {
  children: ReactNode | ReactNode[];
  className: string;
}

export type TextInputConnectedProps = TextInputProps & {
  ref?: Ref<HTMLInputElement>;
};
