import { getOpenai } from '@app/llm/openai';
import { onErrorResponse, onSuccessResponse } from '@app/utils/request';
import { NextRequest } from 'next/server';

/**
 * 
 * @param req 
 * @returns 
 */
export async function POST(req: NextRequest) {
  try {
    const {threadId, runId} = await req.json();
    const runStatus = await getOpenai().beta.threads.runs.retrieve(threadId, runId);
    return onSuccessResponse({ status: runStatus.status });
  } catch (error) {
    return onErrorResponse(`Error occurred: ${error}`)
  }
}