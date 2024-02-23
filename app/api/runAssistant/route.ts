import { getOpenai } from '@app/llm/openai';
import { onErrorResponse, onSuccessResponse } from '@app/utils/request';
import { NextRequest } from 'next/server';

/**
 * Run the assistant with assistantId
 * @param req 
 * @returns 
 */
export async function POST(req: NextRequest) {
  try {
    const {threadId, assistantId} = await req.json();
    const run = await getOpenai().beta.threads.runs.create(threadId, {
      assistant_id: assistantId,
    });

    return onSuccessResponse({ runId: run.id });
  } catch (error) {
    console.error(`Error in -runAssistant: ${error}`);
    return onErrorResponse('Failed to run assistant')
  }
}
