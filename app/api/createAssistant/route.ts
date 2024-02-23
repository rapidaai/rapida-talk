import { getOpenai } from '@app/llm/openai';
import { onErrorResponse, onSuccessResponse } from '@app/utils/request';
import { NextRequest } from 'next/server'

  export async function POST(req: NextRequest) {
    if (req.method === 'POST') {
      try {
          const { assistantName, assistantModel, assistantInstruction, fileIds } = await req.json();
          console.debug('File IDs:', fileIds);
          if (!assistantName || !assistantModel || !assistantInstruction) {
              onErrorResponse('Missing required assistant parameters')
          }
  
          const assistantOptions: any = {
              name: assistantName,
              instructions: assistantInstruction,
              model: assistantModel,
              tools: [{ "type": "retrieval" }, {
                "type": "code_interpreter"
              }],
              
          };
          if (fileIds) {
              assistantOptions.file_ids = fileIds;
          }
  
          const assistant = await getOpenai().beta.assistants.create(assistantOptions);
          console.debug('response form openai for create assiten' , assistant);
          return onSuccessResponse({ 
              message: 'Assistant created successfully', 
              assistantId: assistant.id
          });
      } catch (error) {
          if (error instanceof Error) {
              console.error('Error:', error);
              return onErrorResponse(error.message)
          } else {
              console.error('Unknown error:', error);
              return onErrorResponse('An unknown error occurred');
          }
      }
    } else {
      return onErrorResponse('Method Not Allowed');
    }
  };