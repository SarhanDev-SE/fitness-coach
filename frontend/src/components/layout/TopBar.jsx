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
                    {/* dropdownmenutrigger => the button we click which triggers the dropdown*/}
                    {/* asChild => allows us to pass custom component as the trigger*/}
                    <DropdownMenuTrigger asChild>
                        {/* here we pass our custom avatar component as the trigger */}
                        <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-full">
                            <Avatar>
                                <AvatarImage src="" />
                                <AvatarFallback>S</AvatarFallback>
                            </Avatar>
                        </Button>
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