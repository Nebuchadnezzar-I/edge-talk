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
import { Trash } from "lucide-react";
import { removeNegotiation } from "~/app/_utils/negotiation";

interface NegotiationDeleteProps {
    id: string;
    name: string;
}

export function NegotiationDelete({ id, name }: NegotiationDeleteProps) {
    const handleCreate = async () => {
        await removeNegotiation(id);
        window.location.reload();
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive">
                    <Trash />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>

                <AlertDialogHeader>

                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>

                    <AlertDialogDescription className="flex flex-col">
                        <p>You are about to remove negotiation</p>
                        <strong>{name}</strong>
                    </AlertDialogDescription>

                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button
                        variant="destructive"
                        onClick={handleCreate}
                    >
                        Delete
                    </Button>
                </AlertDialogFooter>

            </AlertDialogContent>
        </AlertDialog>
    )
}

