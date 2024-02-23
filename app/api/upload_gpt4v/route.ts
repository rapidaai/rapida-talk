import { NextRequest, NextResponse } from 'next/server';
import { getOpenai } from '@app/llm/openai';
import { getResponse } from '@app/utils/request';


export async function POST(request: NextRequest) {
  const { file: base64Image, prompt: customPrompt } = await request.json();
  if (!base64Image) {
    return NextResponse.json(getResponse(false, 'No file found'));
  }

  const promptText = customPrompt || "Analyze and describe the image in detail. Focus on visual elements like colors, object details, people's positions and expressions, and the environment. Transcribe any text as 'Content: “[Text]”', noting font attributes. Aim for a clear, thorough representation of all visual and textual aspects.";
  try {
    const response = await getOpenai().chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: promptText },
            {
              type: "image_url",
              image_url: {
                url: base64Image
              }
            }
          ]
        }
      ],
      max_tokens: 200
    });

    const analysis = response?.choices[0]?.message?.content;
    return NextResponse.json(getResponse(true, analysis));
  } catch (error) {
    console.error('Error sending request to OpenAI:', error);
    return NextResponse.json(getResponse(false, 'Error sending request to OpenAI'));
  }
}
