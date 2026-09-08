import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";

function TopBar() {
    return (
        <header className="border-b">
            <div className="px-6 py-4 flex items-center justify-between">
                <div>
                    <span className="text-sm text-muted-foreground">Good Morning, [username]!</span>
                    <h1 className="text-xl font-bold">Welcome back</h1>
                </div>

                {/*avatar*/}
                <DropdownMenu>
                    <DropdownMenuTrigger className="relative h-10 w-10 rounded-full hover:bg-muted inline-flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer">
                        <Avatar>
                            <AvatarImage src="" />
                            <AvatarFallback>S</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>

                    {/* dropdownmenucontent => the dropdown menu that gets triggered*/}
                    <DropdownMenuContent align="end">
                        {/* these are the menu options in the dropdown menu*/}
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuItem>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}

export default TopBar;