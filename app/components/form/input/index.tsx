import * as React from 'react';
import { cn } from '@lib/utils';


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { }
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (props: InputProps, ref) => {
        return (
            <input
                ref={ref}
                id={props.name}
                {...props}
                className={cn(
                    'w-full',
                    'h-9',
                    'dark:placeholder-gray-600 placeholder-gray-400',
                    'dark:text-slate-300 text-slate-600',
                    'dark:focus:ring-slate-400 dark:focus:border-slate-400 focus:border-slate-500',
                    'border border-gray-300 dark:border-gray-600 rounded-sm',
                    'focus:ring-0 focus:outline-none',
                    'bg-gray-50 dark:bg-slate-900/50',
                    'px-2 py-1.5',
                    props.className,
                )}
            />
        );
    },
);
