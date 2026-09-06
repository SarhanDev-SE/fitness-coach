import SideBar from "./SideBar";
import TopBar from "./TopBar";

function AppShell({ children }) {
    return (
        <div className="min-h-screen bg-background">
            <div className="flex h-full">
                {/* sidebar */}
                <aside className="w-64 border-r">
                    <SideBar />
                </aside>

                {/* main content */}
                {/* here everything in the page goes=>eg dashboards, workout plan page etc*/}
                <main className="flex-1 flex flex-col h-full">
                    {/* topbar => in all the pages*/}
                    <TopBar />
                    {/* here the main content of the pages goes*/}
                    {/* flex-1 ensures it fills remaining space and overflow-y-auto => vertical scroll*/}
                    <div className="flex-1 overflow-y-auto p-4">{children}</div>
                </main>
            </div>
        </div>
    )
}

export default AppShell;