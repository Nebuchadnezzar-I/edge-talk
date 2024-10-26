"use server"

import { redirect } from 'next/navigation';

export default async function rPage() {
    redirect("/n/0");
}
