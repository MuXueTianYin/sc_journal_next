// import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
"use client";
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
import {usePathname} from "next/navigation";
import {Diary} from "@/utils/content/utils";


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
    docs: Diary[];
}
export default function AppSidebar ({docs}:Props) {
    const pathname = usePathname();

    console.log(pathname)
    console.log(docs)

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
                                            href={`/diaries/${item.id}`}
                                            className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                                                pathname === `/diaries/${item.id}`
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
