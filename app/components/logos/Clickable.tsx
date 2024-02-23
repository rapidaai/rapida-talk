import React from 'react';
import { cn } from '@app/utils/utils';

interface ClickableLogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    isBeta?: boolean;
    isDev?: boolean;
    alt?: string;
    darkLogo?: string;
    lightLogo?: string;
}

export function ClickableLogo({
    isBeta = false,
    isDev = false,
    alt = 'RapidaAI Logo',
    className = 'w-auto h-6 rounded-md',
    darkLogo = 'https://www.rapida.ai/images/logos/logo-04.png',
    lightLogo = 'https://www.rapida.ai/images/logos/logo-02.png',
    ...imgProps
}: ClickableLogoProps) {
    return (
        <button
            aria-label="logo"
            className="flex flex-inline justify-center items-center"
        >
            <span className="mr-2">
                <img
                    {...imgProps}
                    src={darkLogo}
                    className={cn('hidden dark:block', className)}
                />
                <img
                    {...imgProps}
                    src={lightLogo}
                    className={cn('block dark:hidden', className)}
                />
            </span>
        </button>
    );
}