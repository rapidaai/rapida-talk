// useChatState.ts
import { useState, useRef } from 'react';
import ChatManager from '../services/ChatManager';
import {FileInfo, Message} from '@app/types'

export const useChatState = () => {

  const [assistantName, setAssistantName] = useState('');
  // const [assistantModel, setAssistantModel] = useState('gpt-3.5-turbo-1106');
  const [assistantInstruction, setAssistantInstruction] = useState('');
  const [inputmessage, setInputmessage] = useState('');
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [chatStarted, setChatStarted] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [isStartLoading, setStartLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [initialThreadMessage, setInitialThreadMessage] = useState('You are helpful assistent');
  const [statusMessage, setStatusMessage] = useState('');
  const counter = useRef(0);
  const inputRef = useRef(null);
  const formRef = useRef(null);
  const [chatManager, setChatManager] = useState<ChatManager | null>(null);
  const [assistantId, setAssistantId] = useState<string | null>(process.env.REACT_APP_ASSISTANT_ID || '');
  const [isMessageLoading, setIsMessageLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoadingFirstMessage, setIsLoadingFirstMessage] = useState(false);
  const [chatUploadedFiles, setChatUploadedFiles] = useState<FileInfo[]>([]);
  const [chatFileDetails, setChatFileDetails] = useState<FileInfo[]>([]);
  const [fileIds, setFileIds] = useState<string[]>([]); 


  return {
    assistantName, setAssistantName,
    assistantInstruction, setAssistantInstruction,
    inputmessage, setInputmessage,
    chatMessages, setChatMessages,
    chatStarted, setChatStarted,
    isButtonDisabled, setIsButtonDisabled,
    files, setFiles,
    assistantId, setAssistantId,
    threadId, setThreadId,
    isStartLoading, setStartLoading,
    isSending, setIsSending,
    statusMessage, setStatusMessage,
    counter,
    inputRef,
    formRef,
    initialThreadMessage, 
    setInitialThreadMessage,
    chatManager, setChatManager,
    isMessageLoading, setIsMessageLoading,
    progress, setProgress,
    isLoadingFirstMessage, setIsLoadingFirstMessage,
    chatUploadedFiles, setChatUploadedFiles,
    chatFileDetails, setChatFileDetails,
    fileIds, setFileIds,
  };
};
