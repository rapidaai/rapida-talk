import { getOpenai } from '@app/llm/openai';
import { getResponse } from '@app/utils/request';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const {input, threadId, fileIds } = await req.json();
    if (typeof input !== 'string') {
      return NextResponse.json(getResponse(false, 'Input is not a string'));
    }
    if (input) {
      await getOpenai().beta.threads.messages.create(threadId, {
        role: "user",
        content: input,
        file_ids: fileIds || [],
      });
      return NextResponse.json(getResponse(true, "", {message: "Message Created successful"}));
    }

    return NextResponse.json(getResponse(true, 'No action performed'));
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error:', error);
      return NextResponse.json(getResponse(false, error.message));
    } else {
      console.error('Unknown error:', error);
      return NextResponse.json(getResponse(false, "unknown error while adding message"));
    }
  }
}