import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { createReadStream } from 'fs';
import { getOpenai } from '@app/llm/openai';
import { getResponse } from '@app/utils/request';


export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get('file') as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false });
  }
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const path = `/tmp/${file.name}`;
  await writeFile(path, buffer);
  console.log(`File written to ${path}`);
  try {
    console.log('Starting file upload to OpenAI');
    const fileForRetrieval = await getOpenai().files.create({
      file: createReadStream(path),
      purpose: "assistants",
    });
    console.log(`File uploaded, ID: ${fileForRetrieval.id}`);
    return NextResponse.json({ success: true, fileId: fileForRetrieval.id });
  } catch (error) {
    return NextResponse.json(getResponse(false, 'Error uploading file'));
  }
}