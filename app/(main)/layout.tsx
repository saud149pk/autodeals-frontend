"use client"

import { usePathname } from "next/navigation"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { MainSidebar } from "@/components/main-sidebar"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isStatisticsPage = pathname === '/statistics'

  if (isStatisticsPage) {
    // Statistics page without sidebar
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center">
            <h1 className="text-lg font-semibold">Statistics Dashboard</h1>
          </div>
        </header>
        <main className="flex-1">
          {children}
        </main>
      </div>
    )
  }

  // Default layout with sidebar for other pages
  return (
    <SidebarProvider>
      <MainSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
        </header>
        <main className="flex-1 p-4">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
