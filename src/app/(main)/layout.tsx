import Sidebar from "@/components/Sidebar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="w-screen h-screen flex">
            <div className="left-gap w-70 h-full bg-white border-r-2 border-black">
            </div>
            <div className="left fixed w-70 h-full bg-white border-r-2 border-black">
                <Sidebar />
            </div>
            <div className="right flex-1 p-4">
                {children}
            </div>
        </div>
    );
}
