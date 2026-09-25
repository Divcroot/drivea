import { Navigate, Route, Routes } from "react-router-dom"
import Drivea from "./pages/Drivea"
import { Toaster } from "react-hot-toast"
import Login from "./pages/Login"
import ProtectedRoute from "./components/auth/ProtectedRoute"
import DashboardLayout from "./components/layout/DashboardLayout"
import SharedFile from "./pages/SharedFile"
import Trash from "./pages/Trash"
import SharedWithMe from "./pages/SharedWithMe"

const App = () => {
  return (
    <>

      <Toaster />

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login mode="login" />} />
        <Route path="/register" element={<Login mode="register" />} />
        <Route path="/s/:token" element={<SharedWithMe />} />

        {/* Private Routes */}
        <Route element={<ProtectedRoute />}>

          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Drivea />} />
            <Route path="/drive/:folderId" element={<Drivea />} />
            <Route path="/shared" element={<SharedFile />} />
            <Route path="/trash" element={<Trash />} />
          </Route>

        </Route>
    
        <Route path="*" element={<Navigate to='/' replace />} />
      </Routes>
    </>
  )
}

export default App