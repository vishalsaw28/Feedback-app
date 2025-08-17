import { openai } from "@ai-sdk/openai";
import OpenAI from "openai";
import {
  streamText,
  UIMessage,
  convertToModelMessages,
  tool,
  stepCountIs,
} from "ai";
import { z } from "zod";
import { NextResponse } from "next/server";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

    const { messages }: { messages: UIMessage[] } = await req.json();

    const result = streamText({
      model: openai("gpt-4o"),
      messages: convertToModelMessages(messages),
      stopWhen: stepCountIs(5),
      tools: {
        weather: tool({
          description: "Get the weather in a location (fahrenheit)",
          inputSchema: z.object({
            location: z
              .string()
              .describe("The location to get the weather for"),
          }),
          execute: async ({ location }) => {
            const temperature = Math.round(Math.random() * (90 - 32) + 32);
            return {
              location,
              temperature,
            };
          },
        }),
      },
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      const { name, status, headers, message } = error as any;
      return NextResponse.json(
        {
          name,
          status,
          headers,
          message,
        },
        { status }
      );
    } else {
      console.error("An unexpected error occured", error);
      throw error;
    }
  }
}
