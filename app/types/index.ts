
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

export type IResponse = {
  success: boolean, 
  errorMessage: string | null
  data: any
}