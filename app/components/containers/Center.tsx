import { cn } from '@lib/utils'
import React from 'react'

interface CenterContainerProps extends React.HTMLAttributes<HTMLDivElement> { }
export function CenterContainer(props: CenterContainerProps) {
    const { className, ...oProps } = props
    return (
        <div className="container m-auto md:pt-20">
            <div className="flex flex-col items-center px-4 md:px-8 min-h-[95vh]">
                <div {...oProps}
                    className={cn("mt-10 w-full p-4 md:p-8 dark:bg-slate-900 bg-gray-50 rounded-sm ring-1 ring-gray-900/5", className)}>
                    {props.children}
                </div>
            </div>
        </div>
    )
}