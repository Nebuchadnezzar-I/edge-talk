"use client";

import { useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "~/components/ui/alert-dialog"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { useRouter } from "next/navigation";
import { createNegotiation } from "~/app/_utils/negotiation";

export function NegotiationDialog() {
    const router = useRouter();
    const [name, setName] = useState('');

    const handleCreate = async () => {
        await createNegotiation(name);
        setName("");
        // TODO: Redirect to the newly created negotiation
        router.push(`/n/0`);
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="w-full" variant="outline">Show Dialog</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>

                <AlertDialogHeader>

                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>

                    <AlertDialogDescription>
                        <Input
                            placeholder="Negotiation name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </AlertDialogDescription>

                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleCreate}>
                        Create
                    </AlertDialogAction>
                </AlertDialogFooter>

            </AlertDialogContent>
        </AlertDialog>
    )
}

