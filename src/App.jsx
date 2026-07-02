import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Home from './home/Home'
import Classico from "./pages/classico/Classico";
import Apresentacao from "./pages/apresentacao/Apresentacao";
import Foto from "./pages/foto/Foto";


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/classico" element={<Classico />} />
          <Route path="/apresentacao" element={<Apresentacao />} />
          <Route path="/foto" element={<Foto />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
