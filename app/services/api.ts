// api.js
import { CreateAssistantResponse, CreateThreadResponse, IResponse, RunAssistantResponse, UploadedFileResponse } from '@app/types'



/**
 *  Creation of an assitent
 * @param assistantName 
 * @param assistantModel 
 * @param assistantInstruction
 * @param fileIds a list of file ids that are uploaded to openai server
 * @returns 
 */
export const createAssistant = async (assistantName: string, assistantModel: string, assistantInstruction: string, fileIds: string[]): Promise<IResponse<CreateAssistantResponse>> => {

  const response = await fetch('/api/createAssistant', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ assistantName, assistantModel, assistantInstruction, fileIds: fileIds }),
  });
  if (!response.ok) {
    console.error('Failed to create assistant');
    throw new Error('Failed to create assistant');
  }
  console.debug('Assistant created successfully');
  return await response.json();
};



/**
 * 
 * @param file 
 * @returns 
 */
export const uploadFile = async (file: File): Promise<IResponse<UploadedFileResponse>> => {
  const fileData = new FormData();
  fileData.append('file', file);
  const response = await fetch('/api/upload', {
    method: 'POST',
    body: fileData,
  });
  if (!response.ok) {
    throw new Error('File upload failed');
  }
  return await response.json();
};


/**
 * 
 * @param inputmessage 
 * @returns 
 */
export const createThread = async (inputmessage: string): Promise<IResponse<CreateThreadResponse>> => {
  const response = await fetch('/api/createThread', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ inputmessage }),
  });
  if (!response.ok) {
    console.error('Failed to create thread');
    throw new Error('Failed to create thread');
  }
  return await response.json();
};

// Runs an assistant
/**
 * 
 * @param {*} assistantId 
 * @param {*} threadId 
 * @returns 
 */
export const runAssistant = async (assistantId: string, threadId: string): Promise<IResponse<RunAssistantResponse>> => {
  const response = await fetch('/api/runAssistant', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ assistantId, threadId }),
  });
  if (!response.ok) {
    console.error('Failed to run assistant');
    throw new Error('Failed to run assistant');
  }
  return await response.json();
};


export const checkRunStatus = async (threadId: string, runId: string): Promise<IResponse<RunAssistantStatusResponse>> => {
  const response = await fetch('/api/checkRunStatus', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ threadId, runId }),
  });
  if (!response.ok) {
    console.error('Failed to check run status');
    throw new Error('Failed to check run status');
  }
  console.log('Run status checked successfully');
  return await response.json();
};


/**
 * 
 * @param threadId 
 * @param runId 
 * @returns 
 */
export const listMessages = async (threadId: string, runId: string) => {
  const response = await fetch('/api/listMessages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ threadId, runId }),
  });
  if (!response.ok) {
    console.error(`Error fetching messages: ${response.status} ${response.statusText}`);
    throw new Error(`Failed to list messages: ${response.status} ${response.statusText}`);
  }
  const jsonResponse = await response.json();
  return jsonResponse;
};

// Adds a message
/**
 * 
 * @param {*} data 
 * @returns 
 */
export const addMessage = async (data: any) => {
  console.log('File IDs in addMessage:', data.fileIds);
  console.log('Adding message...');
  const response = await fetch('/api/addMessage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    console.error('Failed to add message');
    throw new Error('Failed to add message');
  }
  return await response.json();
};

/**
 * 
 * @param {*} fileId 
 * @returns 
 */
export const deleteFile = async (fileId: string) => {
  console.log(`Deleting file with ID: ${fileId}...`);
  const response = await fetch(`/api/deleteFile`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fileId }),
  });
  if (!response.ok) {
    console.error('File deletion failed with status:', response.status);
    throw new Error('File deletion failed');
  }
  const jsonResponse = await response.json();
  return jsonResponse.deleted;
};