import { InputHTMLAttributes } from "react";

export type InputSize = 'small' | 'medium' | 'large'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: InputSize
}