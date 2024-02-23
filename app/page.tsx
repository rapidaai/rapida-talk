"use client";

import { AssistantSetup } from '@app/components/AssistantSetup'
import { useChatState, useChatManager, useStartAssistant } from './hooks';
import { Header } from "@app/components/navigations/Header";
import { Conversaction } from '@app/components/Conversaction';
import { ConversactionFooter } from '@app/components/ConversactionFooter'

export default function Page() {
    const {
        assistantName, setAssistantName,
        // assistantModel, setAssistantModel,
        assistantInstruction, setAssistantInstruction,
        inputmessage, setInputmessage,
        chatMessages, setChatMessages,
        isButtonDisabled, setIsButtonDisabled,
        files = [], setFiles,
        isStartLoading, setStartLoading,
        statusMessage, setStatusMessage,
        isSending, setIsSending,
        inputRef,
        formRef,
        initialThreadMessage,
        setInitialThreadMessage,
        setChatStarted,
        chatStarted: chatHasStarted,
        chatManager, setChatManager,
        assistantId,
        isMessageLoading, setIsMessageLoading,
        progress, setProgress,
        isLoadingFirstMessage,
        setIsLoadingFirstMessage,
        chatUploadedFiles = [], setChatUploadedFiles,
        chatFileDetails, setChatFileDetails,
        fileIds, setFileIds,
    } = useChatState();

    useChatManager(setChatMessages, setStatusMessage, setChatManager, setIsMessageLoading, setProgress, setIsLoadingFirstMessage);
    // useStartAssistant(assistantId, chatManager, initialThreadMessage);

    const startChatAssistant = async () => {
        setIsButtonDisabled(true);
        setStartLoading(true);
        if (chatManager) {
            try {
                await chatManager.startAssistant({
                    assistantName: assistantName,
                    assistantInstruction: assistantInstruction,
                    assistantModel: "gpt-3.5-turbo-0125",
                    fileIds: fileIds
                }, initialThreadMessage);
                setChatStarted(true);
            } catch (error) {
                console.error('Error starting assistant:', error);
                if (error instanceof Error) setStatusMessage(`Error: ${error.message}`);
            } finally {
                setIsButtonDisabled(false);
                setStartLoading(false);
            }
        }
    };

    return (
        <main className="flex flex-col relative antialiased text-slate-800 min-h-screen dark:text-slate-400 bg-white dark:bg-slate-950">
            <Header />
            {chatHasStarted || assistantId || isLoadingFirstMessage ? (
                <div className='overflow-y-hidden flex w-full h-[calc(100vh-100px)] justify-center'>
                    <div className="flex flex-col relative w-full">
                        <div className='flex-grow overflow-y-auto'>
                            <Conversaction chatMessages={chatMessages} statusMessage={statusMessage} isSending={isSending} progress={progress} isFirstMessage={isLoadingFirstMessage} fileDetails={chatFileDetails} />
                        </div>
                        <div className="sticky bottom-0 min-w-0 min-h-0 flex-shrink-0 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.6)]">
                            <ConversactionFooter {...{ input: inputmessage, setInput: setInputmessage, inputRef, formRef, disabled: isButtonDisabled || !chatManager, chatStarted: chatMessages.length > 0, isSending, isLoading: isMessageLoading, chatUploadedFiles, setChatUploadedFiles, chatFileDetails, setChatFileDetails, chatManager, setChatStarted, setChatMessages, setStatusMessage, setIsSending, setProgress, setIsLoadingFirstMessage }} />
                        </div>
                    </div>
                </div>
            ) : (
                <AssistantSetup {...{ assistantName, setAssistantName, assistantInstruction, setAssistantInstruction, startChatAssistant, isButtonDisabled, isStartLoading, statusMessage, fileIds, setFileIds }} />
            )}
        </main>
    );
}