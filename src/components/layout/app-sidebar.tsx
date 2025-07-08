// import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
'use client';
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link";
import React from "react";
import {Doc} from "@/lib/docs";
import {usePathname} from "next/navigation";


// const items = [
//     {
//         title: "Home",
//         url: "#",
//         icon: Home,
//     },
//     {
//         title: "Inbox",
//         url: "#",
//         icon: Inbox,
//     },
//     {
//         title: "Calendar",
//         url: "#",
//         icon: Calendar,
//     },
//     {
//         title: "Search",
//         url: "#",
//         icon: Search,
//     },
//     {
//         title: "Settings",
//         url: "#",
//         icon: Settings,
//     },
// ]
interface Props {
    // doc: Doc;
    docs: Doc[];
}
export default function AppSidebar ({docs}:Props) {
    const pathname = usePathname();


    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {docs.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link
                                            href={`/docs/${item.slug}`}
                                            className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                                                pathname === `/docs/${item.slug}`
                                                    ? 'bg-blue-50 text-blue-700'
                                                    : 'text-gray-700 hover:bg-gray-100'
                                            }`}
                                        >
                                            {/*<item.icon />*/}
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
