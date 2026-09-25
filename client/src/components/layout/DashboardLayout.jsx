import { useState } from "react"
import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"
import Header from "./Header"

const DashboardLayout = () => {

    const [isMobileOpen, setIsMobileOpen] = useState(false)

    const handleCreateFolderClick = () => {
        // Placeholder for future folder creation modal
    }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
        {/* Sidebar */}
        <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} onCreateFolderClick={handleCreateFolderClick} />

        {/* Main Content Workspace */}
        <div className="md:pl-64 flex flex-col flex-1">
            {/* Header */}
            <Header onMobileMenuToggle={() => setIsMobileOpen(true)}/>

            <main className="flex-1 p-4 md:p-6 overflow-y-auto">
                <Outlet />
            </main>

        </div>

    </div>
  )
}

export default DashboardLayout