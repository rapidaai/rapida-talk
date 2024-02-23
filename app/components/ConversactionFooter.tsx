import Textarea from 'react-textarea-autosize';
import { cn } from '@lib/utils';
import { FileLabel } from '@app/components/form/files';
import { FileInfo, ProcessingState } from '@app/types'

interface ConversactionFooterProps {
    input: string;
    setInput: (input: string) => void;
    inputRef: React.RefObject<HTMLTextAreaElement>;
    formRef: React.RefObject<HTMLFormElement>;
    disabled: boolean;
    chatStarted: boolean;
    isSending: boolean;
    isLoading: boolean;
    chatUploadedFiles: FileInfo[];
    setChatUploadedFiles: (files: FileInfo[]) => void;
    chatFileDetails: { name: string; type: string; size: number }[];
    setChatFileDetails: (details: { name: string; type: string; size: number }[]) => void;
    chatManager: any;
    setChatStarted: (started: boolean) => void;
    setChatMessages: (messages: any[]) => void;
    setStatusMessage: (message: string) => void;
    setIsSending: (sending: boolean) => void;
    setProgress: (progress: number) => void;
    setIsLoadingFirstMessage: (loading: boolean) => void;
}

export const ConversactionFooter: React.FC<ConversactionFooterProps> = ({ input, setInput, inputRef, formRef, disabled, chatStarted, isSending, isLoading, chatUploadedFiles, setChatUploadedFiles, chatFileDetails, setChatFileDetails, chatManager, setChatStarted, setChatMessages, setStatusMessage, setIsSending, setProgress, setIsLoadingFirstMessage }) => {
    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isSending) {
            return;
        }
        const message = input;
        setInput('');
        setIsSending(true);
        if (chatManager) {
            const currentFiles = chatUploadedFiles;
            setChatUploadedFiles([]);
            setChatFileDetails([]);
            try {
                await chatManager.sendMessage(message, currentFiles, chatFileDetails);
            } catch (error) {
                console.error('Error sending message:', error);
            } finally {
                setIsSending(false);
            }
        }
    };

    const handleChatFilesUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const newFiles = Array.from(event.target.files);
            if (chatFileDetails.length + newFiles.length > 10) {
                alert('You can only upload up to 10 files.');
                return;
            }
            const fileArray = newFiles.map((file) => ({
                name: file.name,
                type: file.type,
                size: file.size,
            }));
            setChatFileDetails([...chatFileDetails, ...fileArray]);
            setChatUploadedFiles([...chatUploadedFiles, ...newFiles]);
        }
        event.target.value = '';
    };

    const removeChatFile = (fileName: string) => {
        const updatedFileDetails = chatFileDetails.filter((file) => file.name !== fileName);
        setChatFileDetails(updatedFileDetails);

        const updatedUploadedFiles = chatUploadedFiles.filter((file) => file.name !== fileName);
        setChatUploadedFiles(updatedUploadedFiles);
    };

    return (
        <div className="bg-slate-100 dark:bg-slate-800 p-3 pr-2.5 border-t dark:border-slate-700">
            <div className="flex flex-col items-stretch w-full max-w-screen-md mx-auto">
                <div className="grid gap-2 grid-flow-row md:grid-cols-2 max-w-full mb-2">
                    {chatFileDetails.map((file, idx) => (
                        <FileLabel key={idx} name={file.name} onDelete={() => { removeChatFile(file.name) }} state={ProcessingState.UPLOADED} />
                    ))}
                </div>
                <form
                    ref={formRef}
                    onSubmit={handleFormSubmit}
                    className="relative flex items-center justify-center space-x-4 p-2.5 resize-none w-full dark:placeholder-gray-600 placeholder-gray-400 border border-gray-300 dark:border-gray-600 rounded-sm dark:text-slate-300 text-slate-600 dark:focus:ring-slate-400 dark:focus:border-slate-400 focus:border-slate-500 focus:ring-0 focus:outline-none bg-gray-50 dark:bg-slate-900 !text-base"
                >
                    <div>
                        <input
                            type="file"
                            id="file-upload"
                            className='hidden'
                            onChange={handleChatFilesUpload}
                            disabled={disabled || !chatStarted || isSending}
                            multiple
                            accept=".c,.cpp,.csv,.docx,.html,.java,.json,.md,.pdf,.pptx,.txt,.tex,image/jpeg,image/png"
                        />
                        <label
                            htmlFor="file-upload"
                            className={cn(
                                "inset-y-0 left-3 my-auto flex h-8 w-8 items-center justify-center rounded-sm transition-all",
                                disabled || !chatStarted || isSending
                                    ? "cursor-not-allowed bg-white dark:bg-slate-600"
                                    : "bg-blue-500 hover:bg-blue-600 cursor-pointer",
                            )}
                        >
                            <span className="text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </span>
                        </label>
                    </div>
                    <Textarea
                        ref={inputRef}
                        tabIndex={0}
                        required
                        rows={1}
                        autoFocus
                        placeholder="Send a message"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey && chatStarted) {
                                formRef.current?.requestSubmit();
                                e.preventDefault();
                            }
                        }}
                        spellCheck={false}
                        className="w-full focus:outline-none bg-transparent resize-none"
                        disabled={disabled || !chatStarted}
                    />


                    <button
                        className={cn(
                            "inset-y-0 right-3 my-auto flex h-8 w-8 items-center justify-center rounded-sm transition-all",
                            disabled || !chatStarted || input.trim().length === 0 || isSending
                                ? "cursor-not-allowed bg-white dark:bg-slate-600"
                                : "bg-green-500 hover:bg-green-600",
                        )}
                        disabled={disabled || !chatStarted || isLoading || isSending}
                    >
                        {isSending ? (
                            <svg
                                aria-hidden="true"
                                className="h-5 w-5 animate-spin fill-stone-600 text-stone-200"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="none"
                                className={cn(
                                    "h-5 w-5",
                                    input.length === 0 ? "text-gray-300" : "text-white",
                                )}
                                strokeWidth="2"
                            >
                                <path
                                    d="M.5 1.163A1 1 0 0 1 1.97.28l12.868 6.837a1 1 0 0 1 0 1.766L1.969 15.72A1 1 0 0 1 .5 14.836V10.33a1 1 0 0 1 .816-.983L8.5 8 1.316 6.653A1 1 0 0 1 .5 5.67V1.163Z"
                                    fill="currentColor"
                                ></path>
                            </svg>

                        )}
                    </button>
                </form>
            </div >
        </div >
    );
};
