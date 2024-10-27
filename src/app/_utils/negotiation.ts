"use server";

import axios from "axios";

import { api } from "~/trpc/server";

export const createNegotiation = async (name: string) => {
    "use server";
    await api.negotiation.create({ name });
};

export const removeNegotiation = async (id: string) => {
    "use server";
    await api.negotiation.removeById({ id });
}

export const removeSession = async (id: string) => {
    "use server";
    await api.session.removeById({ id });
}

const fetchQuestions = async (questionHistory: { q: string, a: string }[]): Promise<string | undefined> => {
    // Add key
    const apiKey = "sk-";
    const url = `https://api.openai.com/v1/chat/completions`;

    try {
        const response = await axios.post(
            url,
            {
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: ` You are a negotiation expert helping a user define their negotiation strategy. Ask one question at a time to understand their needs and goals better. Previous chat: ${JSON.stringify(questionHistory)}. Ask a maximum of 10 questions in total. If you have already asked 10 questions, respond with an empty string or a short response. `,
                    },
                ],
                max_tokens: 100,
                stop: ["\n"],
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`,
                },
            }
        );

        return response.data.choices[0].message.content ?? "";

    } catch (error) {
        console.error('Error fetching questions:', error);
        return "";
    }
};

export const generateNewQuestion =
async (questionHistory: {q: string, a: string}[]): Promise<string | undefined> => {
    "use server";

    const question = await fetchQuestions(questionHistory);

    return question;
}

export const createSession =
async (negotiationID: string, name: string, qaa: { q: string, a: string }[]) => {
    "use server";

    await api.session.newSession({ negotiationID, name, qaa });
}
