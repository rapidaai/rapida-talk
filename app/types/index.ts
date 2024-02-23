import { runAssistant, createAssistant } from '../services/api';

export type FileInfo = {
  name: string;
  type: string;
  size: number;
};

export type Message = {
  role: string; 
  content: any; 
  isLoading: boolean;
  statusMessage: string
}

export enum ProcessingState {
  UPLOADING = "uploading",
  UPLOADED = "uploaded",
  FAILED = "failed",
}

export type ProcessFile = {
  name: string;
  fileId?: string;
  status: ProcessingState;
}

export type IResponse<T> = {
  success: boolean, 
  errorMessage: string | null
  data: T
}

export interface CreateAssistantResponse {
  assistantId: string;
}

export interface UploadedFileResponse {
  fileId: string;
}

export interface CreateThreadResponse {
  threadId: string;
}

export interface RunAssistantResponse {
  runId: string
}

export interface RunAssistantStatusResponse {
  status: string
}

export interface CreateAssistantRequest {
  assistantName: string;
  assistantInstruction: string;
  assistantModel: string;
  fileIds: string[];
}
