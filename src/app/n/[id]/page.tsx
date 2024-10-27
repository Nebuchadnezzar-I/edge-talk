import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "~/components/ui/accordion"
import { NegotiationDelete } from "~/app/_components/negotiation/delete";
import { AppSidebar } from "~/components/app-sidebar";
import { SidebarContent, SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { api } from "~/trpc/server";
import { SessionDialog } from "~/app/_components/negotiation/new-session";

interface NegotiationPageProps {
    params: {
        id: string;
    };
}

export default async function NegotiationPage({ params }: NegotiationPageProps) {
    const negotiationData =
        await api.negotiation.getById({ id: params.id ?? '' });

    const sessionData =
        await api.session.getAll({ negotiationID: params.id ?? '' });

    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="p-5 w-full">
                <SidebarTrigger className="scale-[1.2]" />
                {
                    params.id.length < 2 ? (
                        <div className="flex items-center justify-center w-full h-full">
                            <h1 className="text-xl font-bold">Select a negotiation</h1>
                        </div>
                    ) : (
                            <SidebarContent className="py-3 w-full">
                                <div className="flex items-center justify-between w-full">
                                    <h1 className="font-bold">{negotiationData?.name}</h1>
                                    <div className="flex gap-3">
                                        <SessionDialog
                                            nId={negotiationData?.id ?? ''}
                                        />
                                        <NegotiationDelete
                                            id={negotiationData?.id ?? ''}
                                            name={negotiationData?.name ?? ''}
                                        />
                                    </div>
                                </div>

                                <Accordion type="single" collapsible className="w-full">
                                    {
                                        sessionData?.map((session) => (
                                            <AccordionItem key={session.id} value={session.id}>
                                                <AccordionTrigger>
                                                    {session.name}
                                                </AccordionTrigger>
                                                <AccordionContent>
                                                    TODO: Implement session content
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))
                                    }
                                </Accordion>
                            </SidebarContent>
                        )
                }
            </main>
        </SidebarProvider>
    );
}
