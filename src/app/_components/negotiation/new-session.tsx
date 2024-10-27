"use client";

import { AlertDialogAction } from "@radix-ui/react-alert-dialog";
import { useState, useTransition } from "react";
import { generateRandomString } from "~/app/_utils/math";
import { createSession, generateNewQuestion } from "~/app/_utils/negotiation";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "~/components/ui/alert-dialog"
import { Button } from "~/components/ui/button"
import { Textarea } from "~/components/ui/textarea"

const qanda: { q: string, a: string }[] = [];

interface SessionDialogProps {
    nId: string;
}

export function SessionDialog({ nId }: SessionDialogProps) {
    if (nId === '') throw new Error('Negotiation ID is required');

    const [userAnswer, setUserAnswer] = useState("");
    const [question, setQuestion] = useState("What is the session about?");
    const [loading, startTransition] = useTransition();
    const [isDialogOpen, setIsDialogOpen] = useState(true);

    const handleCreate = () => {
        startTransition(async () => {
            try {
                qanda.push({q: question, a: userAnswer });
                const newQuestion = await generateNewQuestion(qanda);

                console.log("New question", newQuestion);

                // Fix somehow the API response, this is bad workaround
                if (qanda.length >= 10) {
                    await createSession(nId, generateRandomString(), qanda);
                    setIsDialogOpen(false);
                    window.location.reload();
                    return;
                }

                setQuestion(newQuestion ?? "No more questions");
                setUserAnswer("");
            } catch (error) {
                console.error("Failed to generate the next question", error);
            }
        });
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="w-full" variant="outline">Add new session</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>

                <AlertDialogHeader>
                    <AlertDialogTitle>Q&A</AlertDialogTitle>

                    <AlertDialogDescription className="flex flex-col gap-3">
                        <span>{question}</span>
                        <Textarea
                            onChange={(e) => setUserAnswer(e.target.value)}
                            value={userAnswer}
                            disabled={loading}
                        />
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>
                        Cancel
                    </AlertDialogCancel>
                    {
                        isDialogOpen ?
                        <Button onClick={handleCreate} disabled={loading || !userAnswer}>
                            {loading ? "Loading..." : "Next"}
                        </Button>
                        :
                        <Button variant="default">
                            <AlertDialogAction onClick={handleCreate}>
                                Finish
                            </AlertDialogAction>
                        </Button>
                    }
                </AlertDialogFooter>

            </AlertDialogContent>
        </AlertDialog>
    )
}

