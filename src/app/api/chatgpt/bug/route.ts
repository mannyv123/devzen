import { NextRequest, NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

interface BugRequest {
    inputFunc: string;
    language: string;
}

const configuration = new Configuration({
    organization: process.env.OPENAI_ORG_KEY,
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const POST = async (req: NextRequest) => {
    const body: BugRequest = await req.json();

    if (!body.inputFunc || !body.language) {
        return new NextResponse("Missing required information", { status: 400 });
    }

    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: `You will be provided with ${body.language} code, and your task is to find bugs and explain how to fix them.`,
                },
                {
                    role: "user",
                    content: `${body.inputFunc}`,
                },
            ],
            temperature: 0,
            max_tokens: 256,
        });

        return NextResponse.json(completion.data.choices[0].message?.content, { status: 200 });
    } catch (err) {
        console.log(err);
        return NextResponse.json(`Error retreiving response: ${err}`, { status: 500 });
    }
};
