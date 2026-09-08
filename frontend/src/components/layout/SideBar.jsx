import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { LayoutDashboard, Dumbbell, BarChart3, User, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


   
const navigation = [
    {
        label: "Home",
        href: "/dashboard",
        icon: LayoutDashboard,
        active: true,
    },
    {
        label: "Workouts",
        href: "/workouts/new",
        icon: Dumbbell,
        active: false,
    },
    {
        label: "Progress",
        href: "/progress",
        icon: BarChart3,
        active: false,
    },
    {
        label: "Profile",
        href: "/profile",
        icon: User,
        active: false,
    },
    {
        label: "Settings",
        href: "/settings",
        icon: Settings,
        active: false,
    },
];

function SideBar(){
    const navigate = useNavigate();

    return (
        <div className="space-y-6 p-2">
            <div className="space-y-2">
                <h2 className="text-lg font-semibold">Repwise</h2>
                <p className="text-muted-foreground text-sm">Your AI fitness coach</p>
            </div>

            <Separator />

            <nav className="space-y-2">
                {
                    navigation.map(item => (
                        <Button
                            key={item.label}
                            variant={item.active ? "default" : "ghost"}
                            onClick={() => {
                                // setting all to false
                                navigation.map(item => item.active = false);
                                // and then setting current one to true
                                item.active = true;
                                navigate(item.href); 
                                
                            }}
                            size="sm"
                            className="w-full justify-start gap-3"
                        >
                            {item.icon && <item.icon className="h-4 w-4" />}
                            {item.label}
                        </Button>
                    ))
                }
            </nav>
        </div>
    )
}

export default SideBar;