import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FileInfo, Message } from "@app/types";


interface ConversactionProps {
    chatMessages: Message[]
    statusMessage: string
    isSending: boolean
    progress: number
    isFirstMessage: boolean
    fileDetails: FileInfo[]
}

interface SingleMessageProps {
    message: Message
}

const SingleMessage = (props: SingleMessageProps) => {
    const { message } = props
    return (
        <div className="px-3 md:py-4 py-2.5 group transition-opacity message bg-gray-200/50 dark:bg-slate-800/50">
            <div className="flex items-center max-w-2xl mx-auto space-x-3">
                <div className="flex-shrink-0 mr-3 border rounded-full p-2 bg-white dark:bg-slate-900 dark:border-slate-700">
                    {message.role === "user" ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                            className="w-6 h-6"
                        >
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                        </svg>
                    ) :
                        (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                            className="w-6 h-6">
                            <path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" />
                            <path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" />
                        </svg>)}
                </div>
                <div className="w-full min-w-0 text-sm sm:text-base">
                    <div className="w-full flex-1 leading-6 max-w-full">
                        <ReactMarkdown
                            className="prose mt-1 break-words prose-p:leading-relaxed"
                            remarkPlugins={[remarkGfm]}
                            components={{
                                a: (props) => (
                                    <a {...props} target="_blank" rel="noopener noreferrer" />
                                ),
                            }}
                        >
                            {message.content}
                        </ReactMarkdown>
                    </div>
                </div>
                <div className="flex mt-[2px]">
                    <div className="">
                        <button
                            className="transition-opacity opacity-0 group-hover:delay-200 group-hover:opacity-100 block p-1 text-sm font-semibold rounded-md cursor-pointer text-slate-500 sm:leading-6 hover:bg-slate-100 dark:hover:bg-slate-900 dark:hover:text-slate-300 hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                                className="w-4 h-4"
                            >
                                <path d="M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12A1.5 1.5 0 0117 6.622V12.5a1.5 1.5 0 01-1.5 1.5h-1v-3.379a3 3 0 00-.879-2.121L10.5 5.379A3 3 0 008.379 4.5H7v-1z" />
                                <path d="M4.5 6A1.5 1.5 0 003 7.5v9A1.5 1.5 0 004.5 18h7a1.5 1.5 0 001.5-1.5v-5.879a1.5 1.5 0 00-.44-1.06L9.44 6.439A1.5 1.5 0 008.378 6H4.5z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div >
    );
};
// MessageList component to display a list of messages
export const Conversaction = (props: ConversactionProps) => {
    const { chatMessages, statusMessage, isSending, progress, isFirstMessage, fileDetails } = props
    let messages = [...chatMessages];
    const loadingMessageIndex = messages.findIndex(
        (message) => message.role === "assistant" && message.isLoading
    );

    if (isSending) {
        if (loadingMessageIndex !== -1) {
            messages[loadingMessageIndex].statusMessage = statusMessage;
        }
    } else if (loadingMessageIndex !== -1) {
        messages.splice(loadingMessageIndex, 1);
    }

    return (
        <div className="w-full dark:bg-slate-900/60 bg-slate-100/60">
            <div className="divide-y dark:divide-slate-700/50 divide-slate-300/50">
                {messages.map((message, i) => (
                    <SingleMessage key={i} message={message} />
                ))}
            </div>
        </div>
    );
};
