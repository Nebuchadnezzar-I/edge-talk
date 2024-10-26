"use server";

import { api } from "~/trpc/server";

export const createNegotiation = async (name: string) => {
    "use server";
    await api.negotiation.create({ name });
};

export const removeNegotiation = async (id: string) => {
    "use server";
    await api.negotiation.removeById({ id });
}
