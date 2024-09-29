import { Route, Routes } from "react-router-dom"

import Login from "./components/Login"
import Register from "./components/Register"
import Homepage from "./components/HomePage/Homepage"


function App() {

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default App
