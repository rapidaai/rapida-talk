import React, { Fragment, useContext } from 'react';
import { ClickableLogo } from '@app/components/logos/Clickable';
import { Menu, Transition } from '@headlessui/react';
import { cn } from '@app/utils/utils';
import { useNavigate } from 'react-router-dom';

/**
 * 
 * @returns 
 */
export function Header() {
    return (
        <nav className="sticky top-0 z-40">
            <div className={cn(
                'w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 border-b border-slate-900/10 dark:!border-slate-50/10 bg-white/10 dark:bg-slate-900/10 supports-backdrop-blur:bg-white/60 ',
            )}
            >
                <div
                    className={cn(
                        'mx-auto container py-3',
                        'text-gray-700 text-base transition data-[disabled]:text-gray-400 dark:data-[disabled]:text-gray-700 duration-200 dark:text-gray-300',
                    )}
                >
                    <div className="flex justify-between p-3">
                        <ClickableLogo
                            isBeta={true}
                            onClick={() => {
                                // navigate('/');
                            }}
                        ></ClickableLogo>
                        <ul className="items-center list-none space-x-2 hidden md:flex">

                            <li>
                                <a
                                    target="_blank"
                                    href="https://github.com/rapidaai/rapida-talk"
                                    className="hover:bg-slate-950/30 font-medium hover:text-white dark:hover:bg-white/30 focus:ring-1 focus:ring-gray-950/10 dark:focus:ring-white/20 dark:data-[state=open]:text-white data-[state=open]:bg-gray-950/5 dark:data-[state=open]:bg-white/5 data-[state=open]:text-gray-950 group flex select-none items-center justify-between gap-1 rounded-full px-3 py-2.5 leading-none outline-none data-[state=open]:ring-0"
                                    rel="noreferrer"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                        className="w-4 h-4">
                                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                                    View Github
                                </a>
                            </li>

                            <li>
                                <a
                                    className={cn(
                                        'relative ml-auto flex h-9 w-full items-center justify-center before:absolute before:inset-0 before:rounded-full before:transition-transform before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-600 sm:px-4 before:border before:border-blue-600 before:bg-gray-100 dark:before:bg-gray-800',
                                    )}
                                    target="_blank"
                                    href="https://calendly.com/rapida-ai/30min"
                                    rel="noreferrer"
                                >
                                    <span className="relative text-base font-medium text-white dark:text-gray-900 lg:text-blue-600 lg:dark:text-white">
                                        Schedule A Call
                                    </span>
                                    <span className="relative ml-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-6 h-6 dark:text-white text-blue-600"
                                        >
                                            <path d="M18 8L22 12L18 16" />
                                            <path d="M2 12H22" />
                                        </svg>
                                    </span>
                                </a>
                            </li>
                        </ul>
                        <MobileMenu />
                    </div>
                </div>
            </div>

        </nav >
    );
}


function MobileMenu() {
    return (
        <Menu as="div" className="inline-block text-left md:hidden">
            {({ open }) => (
                <>
                    <Menu.Button
                        className={cn(
                            'block md:hidden',
                            'relative ml-auto flex w-fit p-2 items-center',
                            'rounded-full',
                            'justify-center bg-gray-100 dark:bg-gray-800',
                        )}
                    >
                        {!open ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18 18 6M6 6l12 12"
                                />
                            </svg>
                        )}
                    </Menu.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items
                            className={cn(
                                'absolute right-0 top-full mt-2 w-full origin-top-right rounded-lg bg-white shadow-lg',
                                'z-20 border border-gray-950/[.15] dark:border-white/10 ring-1 ring-white/25 dark:ring-gray-950/50 backdrop-blur-3xl bg-white/90 dark:bg-gray-950/90',
                            )}
                        >
                            <div className="px-4 py-4 space-y-2 text-xl">
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="/"
                                            className="hover:bg-slate-950/30 font-medium hover:text-white dark:hover:bg-white/30 focus:ring-1 focus:ring-gray-950/10 dark:focus:ring-white/20 dark:data-[state=open]:text-white data-[state=open]:bg-gray-950/5 dark:data-[state=open]:bg-white/5 data-[state=open]:text-gray-950 group flex select-none items-center justify-between gap-1 rounded-full px-3 py-2.5 leading-none outline-none data-[state=open]:ring-0"
                                        >
                                            Product
                                        </a>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            target="_blank"
                                            href="https://docs.rapida.ai"
                                            className="hover:bg-slate-950/30 font-medium hover:text-white dark:hover:bg-white/30 focus:ring-1 focus:ring-gray-950/10 dark:focus:ring-white/20 dark:data-[state=open]:text-white data-[state=open]:bg-gray-950/5 dark:data-[state=open]:bg-white/5 data-[state=open]:text-gray-950 group flex select-none items-center justify-between gap-1 rounded-full px-3 py-2.5 leading-none outline-none data-[state=open]:ring-0"
                                            rel="noreferrer"
                                        >
                                            Docs
                                        </a>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            target="_blank"
                                            href="https://rapida.canny.io/"
                                            className="hover:bg-slate-950/30 font-medium hover:text-white dark:hover:bg-white/30 focus:ring-1 focus:ring-gray-950/10 dark:focus:ring-white/20 dark:data-[state=open]:text-white data-[state=open]:bg-gray-950/5 dark:data-[state=open]:bg-white/5 data-[state=open]:text-gray-950 group flex select-none items-center justify-between gap-1 rounded-full px-3 py-2.5 leading-none outline-none data-[state=open]:ring-0"
                                            rel="noreferrer"
                                        >
                                            Roadmap
                                        </a>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href={'/auth/signin'}
                                            className="hover:bg-slate-950/30 font-medium hover:text-white dark:hover:bg-white/30 focus:ring-1 focus:ring-gray-950/10 dark:focus:ring-white/20 dark:data-[state=open]:text-white data-[state=open]:bg-gray-950/5 dark:data-[state=open]:bg-white/5 data-[state=open]:text-gray-950 group flex select-none items-center justify-between gap-1 rounded-full px-3 py-2.5 leading-none outline-none data-[state=open]:ring-0"
                                        >
                                            Signin
                                        </a>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            className={cn(
                                                'relative px-4 flex h-9 w-fit items-center justify-center before:absolute before:inset-0 before:rounded-full before:transition-transform before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-600 sm:px-4 before:border before:border-blue-600 before:bg-gray-100 dark:before:bg-gray-800',
                                            )}
                                            target="_blank"
                                            href="https://calendly.com/rapida-ai/30min"
                                            rel="noreferrer"
                                        >
                                            <span className="relative text-base font-medium text-blue-600 dark:text-white">
                                                Schedule A Call
                                            </span>
                                            <span className="relative ml-2">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="w-6 h-6 dark:text-white text-blue-600"
                                                >
                                                    <path d="M18 8L22 12L18 16" />
                                                    <path d="M2 12H22" />
                                                </svg>
                                            </span>
                                        </a>
                                    )}
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </>
            )}
        </Menu>
    );
}
