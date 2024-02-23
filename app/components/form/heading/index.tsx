import * as React from 'react';
export function FormHeading(props: {
    heading: string;
    action?: React.ReactElement;
}) {
    return (
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold leading-9 tracking-tight">
                {props.heading}
            </h2>
            {props.action}
        </div>
    );
}
