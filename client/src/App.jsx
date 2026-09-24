import { Navigate, Route, Routes } from "react-router-dom"
import Drivea from "./pages/Drivea"
import { Toaster } from "react-hot-toast"
import Login from "./pages/Login"

const App = () => {
  return (
    <>

      <Toaster />

      <Routes>
        <Route path="/login" element={<Login mode="login" />} />
        <Route path="/register" element={<Login mode="register" />} />
        <Route path="/" element={<Drivea />} />
        <Route path="*" element={<Navigate to='/' replace />} />
      </Routes>
    </>
  )
}

export default App