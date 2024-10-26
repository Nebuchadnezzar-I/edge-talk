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

interface NegotiationPageProps {
    params: {
        id: string;
    };
}

export default async function NegotiationPage({ params }: NegotiationPageProps) {
    const negotiationData =
        await api.negotiation.getById({ id: params.id ?? '' });

    return (
        <div>
            <SidebarProvider>
                <AppSidebar />
                <main className="p-5 w-full">
                    <SidebarTrigger className="scale-[1.2]" />
                    <SidebarContent className="py-3 w-full">
                        <div className="flex items-center justify-between w-full">
                            <h1 className="font-bold">{negotiationData?.name}</h1>
                            <NegotiationDelete
                                id={negotiationData?.id ?? ''}
                                name={negotiationData?.name ?? ''}
                            />
                        </div>

                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                                <AccordionContent>
                                    Yes. It adheres to the WAI-ARIA design pattern.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>Is it styled?</AccordionTrigger>
                                <AccordionContent>
                                    Yes. It comes with default styles that matches the other
                                    components&apos; aesthetic.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>Is it animated?</AccordionTrigger>
                                <AccordionContent>
                                    Yes. It&apos;s animated by default, but you can disable it if you
                                    prefer.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>

                    </SidebarContent>
                </main>
            </SidebarProvider>
        </div>
    );
}
