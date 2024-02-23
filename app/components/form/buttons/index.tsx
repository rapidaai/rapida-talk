import React, { ElementType } from 'react';
import { cn } from '@lib/utils';
/**
 *
 */
export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     *
     */
    children?: any;
}

export function Button(props: ButtonProps) {
    return (
        <button
            {...props}
            className={cn(
                'flex h-9 leading-7 truncate w-fit justify-center items-center text-sm disabled:opacity-70',
                'bg-blue-600 font-medium text-white hover:bg-blue-500 py-1.5 px-3 rounded-sm',
                props.className,
            )}
        >
            {props.children}
        </button>
    );
}

export function BorderButton(props: ButtonProps) {
    return (
        <button
            {...props}
            className={cn(
                'flex h-9 truncate w-fit justify-center items-center text-sm',
                'font-medium',
                'dark:placeholder-gray-600 placeholder-gray-400',
                'dark:text-slate-300 text-slate-600',
                'dark:focus:ring-slate-400 dark:focus:border-slate-400 focus:border-slate-500',
                'border border-gray-300 dark:border-gray-600 rounded-sm',
                'bg-gray-50 dark:bg-slate-900/50',
                'focus:ring-0 focus:outline-none',
                'py-1.5 px-2 rounded-sm',
                'border-[1px] ',
                props.className,
            )}
        >
            {props.children}
        </button>
    );
}

export const SimpleButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (props: ButtonProps, ref) => {
        return (
            <button
                {...props}
                className={cn(
                    'flex h-9 truncate w-fit justify-center items-center text-sm font-medium',
                    'text-slate-500 dark:hover:text-slate-300 hover:text-slate-900',
                    'py-1.5 px-2 rounded-sm',
                    'hover:bg-slate-100 dark:hover:bg-slate-900',
                    props.className,
                )}
            >
                {props.children}
            </button>
        );
    },
);
