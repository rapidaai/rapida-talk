import "./globals.css";
import { ReactNode } from "react";



export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Source+Sans+3:ital,wght@0,200..900;1,200..900&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className="relative antialiased text-slate-800 min-h-screen dark:text-slate-400 bg-white dark:bg-slate-950">
                {children}
            </body>
        </html>
    );
}