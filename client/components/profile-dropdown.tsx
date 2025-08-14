import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { LayoutDashboard, LogOut } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function ProfileDropDown({ user }) {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="flex items-center gap-2 border border-gray-300 rounded-md px-2 cursor-pointer">
                    <Avatar>
                        <AvatarImage src={user.image} alt={user.name} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    {user.name.split(" ")[0]}
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    <Link href="/c/dashboard" className="flex gap-2">
                        <LayoutDashboard />
                        Dashboard
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <LogOutConfirmation />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

function LogOutConfirmation() {
    const router = useRouter();

    return (
        <AlertDialog>
            <AlertDialogTrigger className="text-red-400 flex gap-2 items-center cursor-pointer" onClick={(e) => e.stopPropagation()}>
                <LogOut className="text-red-400" />
                Log Out
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
                    <AlertDialogDescription>This will log you out from this device.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={async () => {
                        await signOut()
                        router.refresh()
                    }} className="bg-red-500 hover:bg-red-400">Logout</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}