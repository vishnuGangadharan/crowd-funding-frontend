// src/global.d.ts

declare module '@material-tailwind/react' {
    import { FC, ButtonHTMLAttributes, InputHTMLAttributes } from 'react';
  
    interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
      size?: 'sm' | 'md' | 'lg';
      color?: 'purple' | 'blue' | 'green' | 'red' | 'yellow';
    }
  
    export const Button: FC<ButtonProps>;
  
    interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
      variant?: 'standard' | 'filled' | 'outlined';
      label?: string;
    }
  
    export const Input: FC<InputProps>;
  }
  