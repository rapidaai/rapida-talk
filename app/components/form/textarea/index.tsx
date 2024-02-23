import React from 'react';
import { cn } from '@app/utils/utils';
interface TextAreaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    row: number;
}

export function Textarea(props: TextAreaProps) {
    return (
        <textarea
            {...props}
            id={props.name}
            required
            name={props.name}
            rows={props.row}
            className={cn(
                'block p-2.5 resize-none w-full',
                'dark:placeholder-gray-600 placeholder-gray-400',
                'border border-gray-300 dark:border-gray-600 rounded-sm',
                'dark:text-slate-300 text-slate-600',
                'dark:focus:ring-slate-400 dark:focus:border-slate-400 focus:border-slate-500',
                'focus:ring-0 focus:outline-none',
                'bg-gray-50 dark:bg-slate-900',
                props.className,
            )}
            placeholder={props.placeholder}
        ></textarea>
    );
}
