"use client";
import { Button } from "../ui/button";
import { UserCircle } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut, useSession } from "next-auth/react"
import { useToast } from "@/hooks/use-toast";

export default function NavbarClient() {

    const session = useSession();
    const { toast } = useToast();
    function onLogOutClick() {
        signOut();
        toast({
            title: "Logged out",
            description: "You have been logged out."
        })
    }

    return (
            session?.data?.user ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button size="sm" >
                             <UserCircle size={18} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem disabled>Profile</DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <button className="w-full cursor-pointer" onClick={onLogOutClick}>Log Out</button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            ) :
                <Button variant="default" className="ml-2 lg:ml-auto rounded-full px-4" size="sm">
                    Book A Demo
                </Button>
    )
}