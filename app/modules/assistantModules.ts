import {
  uploadFile,
  createAssistant,
  createThread,
  runAssistant,
  deleteFile,
} from '../services/api';
import { CreateAssistantRequest, CreateAssistantResponse, CreateThreadResponse, IResponse, RunAssistantResponse, UploadedFileResponse } from '@app/types';



/**
 * upload the file and get file id
 * @param file 
 * @param setStatusMessage 
 * @returns 
 */
export const prepareUploadFile = async (file: File, setStatusMessage: (message: string) => void): Promise<string> => {

  // return { fileId: jsonResponse.fileId }; // return only the fileId

  const uploadedFile: IResponse<UploadedFileResponse> = await uploadFile(file);
  if (uploadedFile.success)  {
    return uploadedFile.data.fileId
  }

  if (uploadedFile.errorMessage)
    throw new Error(uploadedFile.errorMessage);
  throw new Error("Unable to process your request, please try again.");
};



/**
* Initializes a chat assistant with the given details.
* @param {Object} assistantDetails - Details of the assistant to be created.
* @param {string} fileId - The ID of the uploaded file associated with the assistant.
* @returns {Promise<string>} - The ID of the created assistant.
*/
export const initializeAssistant = async (assistantDetail: CreateAssistantRequest): Promise<string> => {
  const assistantData: IResponse<CreateAssistantResponse> = await createAssistant(
      assistantDetail.assistantName,
      assistantDetail.assistantModel,
      assistantDetail.assistantInstruction,
      assistantDetail.fileIds
  );
  if (assistantData.success)
    return  assistantData.data.assistantId
  if (assistantData.errorMessage)
    throw new Error(assistantData.errorMessage);
  throw new Error("Unable to process your request, please try again.");
};



/**
 * 
 * @param inputMessage 
 * @returns 
 */
export const createChatThread = async (inputMessage: string): Promise<string> => {
  const threadData: IResponse<CreateThreadResponse> = await createThread(inputMessage);
  if (threadData.success)
    return  threadData.data.threadId
  if (threadData.errorMessage)
    throw new Error(threadData.errorMessage);
  throw new Error("Unable to process your request, please try again.");
};




/**
* Runs the chat assistant for a given thread.
* @param {string} assistantId - The ID of the assistant.
* @param {string} threadId - The ID of the thread.
* @returns {Promise<void>} - A promise that resolves when the assistant is successfully run.
*/
export const runChatAssistant = async (assistantId: string, threadId: string): Promise<string> => {
  const assistantData: IResponse<RunAssistantResponse>  = await runAssistant(assistantId, threadId);
  if (assistantData.success)
    return  assistantData.data.runId;
  if (assistantData.errorMessage)
    throw new Error(assistantData.errorMessage);
  throw new Error("Unable to process your request, please try again.");

};

/**
* Deletes a file from the chat assistant.
* @param {string} fileId - The ID of the file to be deleted.
* @returns {Promise<boolean>} - The status of the deletion.
*/
export const deleteUploadedFile = async (fileId: string, setStatusMessage: (message: string) => void): Promise<boolean> => {
  setStatusMessage(`Gona Deleting file with ID: ${fileId}...`);
  console.log(`Gonna Deleting file with ID: ${fileId}...`);

  try {
    const deletionStatus = await deleteFile(fileId);
    setStatusMessage(`File with ID: ${fileId} deleted successfully.`);
    console.log(`File with ID: ${fileId} deleted successfully.`);
    return deletionStatus;
  } catch (error) {
    setStatusMessage(`Error deleting file with ID: ${fileId}.`);
    console.error('Error deleting file:', error);
    return false;
  }
};