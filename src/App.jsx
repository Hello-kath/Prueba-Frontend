import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; 
import Home from './pages/Home';  
import Login from "./pages/Login"; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirigir la raíz "/" a "/home" */}
        <Route path="/" element={<Navigate to="/home" />} />

        {/* Página principal */}
        <Route path="/home" element={<Home />} />

        {/* Página de Login */}
        <Route path="/login" element={<Login />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;


