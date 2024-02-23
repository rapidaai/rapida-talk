import { getOpenai } from '@app/llm/openai';
import { onErrorResponse, onSuccessResponse } from '@app/utils/request';
import { NextRequest, NextResponse } from 'next/server';

/**
 * 
 * @param req 
 * @returns 
 */
export async function POST(req: NextRequest) {
  if (req.method === 'POST') {
    try {
      const data = await req.json();
      const inputMessage = data.inputmessage;

      if (!inputMessage || typeof inputMessage !== 'string') {
        return onErrorResponse('inputmessage is missing or not a string')
      }

      const thread = await getOpenai().beta.threads.create({
        messages: [
          {
            role: "user",
            content: inputMessage,
          },
        ],
      });
      return onSuccessResponse({ threadId: thread.id});
    } catch (error) {
      return onErrorResponse((error as Error).message);
    }
  } else {
    return onErrorResponse('Method not allowed');
  }
}