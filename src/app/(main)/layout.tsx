import Sidebar from "@/components/Sidebar"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex h-screen w-screen">
      <div className="left-gap h-full w-70 border-r-2 border-black bg-white"></div>
      <div className="left fixed h-full w-70 border-r-2 border-black bg-white">
        <Sidebar />
      </div>
      <div className="right flex-1 p-4">{children}</div>
    </div>
  )
}
