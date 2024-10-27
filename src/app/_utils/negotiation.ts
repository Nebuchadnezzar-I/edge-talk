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

export const generateNewQuestion = async (questionHistory: {q: string, a: string}[]) => {
    "use server";
}
