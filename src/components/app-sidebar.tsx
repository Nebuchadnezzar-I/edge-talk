import Link from 'next/link';
import { NegotiationDialog } from '~/app/_components/negotiation/modal';

import {
    Sidebar,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "~/components/ui/sidebar"
import { api } from '~/trpc/server';

export async function AppSidebar() {
    const data = await api.negotiation.getAll();

    const trimmedString = (str: string) =>
        str.length > 28 ? str.slice(0, 25) + '...' : str;

    return (
        <Sidebar>
            <SidebarHeader />
            <SidebarMenu className="p-2 gap-2">
                <NegotiationDialog />
                {data.map((item) => (
                    <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton asChild>
                            <Link href={`/n/${item.id.toLowerCase()}`}>
                                {trimmedString(item.name)}
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
            <SidebarFooter />
        </Sidebar>
    )
}
