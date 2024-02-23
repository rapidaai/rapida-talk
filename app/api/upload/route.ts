import { NextRequest } from 'next/server';
import { writeFile } from 'fs/promises';
import { createReadStream } from 'fs';
import { getOpenai } from '@app/llm/openai';
import { onErrorResponse, onSuccessResponse } from '@app/utils/request';


export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get('file') as unknown as File;

  if (!file) {
    return onErrorResponse("file param is required")
  }
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const path = `/tmp/${file.name}`;
  await writeFile(path, buffer);
  try {
    const fileForRetrieval = await getOpenai().files.create({
      file: createReadStream(path),
      purpose: "assistants",
    });
    console.debug(`file uploaded successfully with response`)
    return onSuccessResponse({fileId: fileForRetrieval.id});
  } catch (error) {
    console.error("error while uploading file", error)
    return onErrorResponse('Error uploading file');
  }
}