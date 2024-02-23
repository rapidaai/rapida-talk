import * as React from 'react';


interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    text: string
}
export function Label(props: LabelProps) {

    const { text, ...attrs } = props
    return (
        <label
            htmlFor={props.htmlFor}
            className={`font-medium leading-6 opacity-80 cursor-pointer inline-flex items-center`}
        >
            {text}
        </label>
    );
}
