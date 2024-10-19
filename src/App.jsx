import { Route } from "react-router-dom"
import { Routes } from "react-router-dom"
import "./App.css"
import Acceuil from "./Pages/Acceuil/Acceuil"
import Services from "./Pages/Services/Services"
import Appareils from "./Pages/Appareils/Appareils"
import Contact from "./Pages/Contact/Contact"
import Shop from "./Pages/Shop/Shop"


function App() {

  return (
    <>
     <Routes>
        <Route index path="/" element={<Acceuil/>} />
        <Route path="/services" element={<Services/>} />
        <Route path="/Contact" element={<Contact/>} />
        <Route path="/Appareils" element={<Appareils/>} />
        <Route path="/Shop" element={<Shop/>} />
     </Routes>
    </>
  )
}

export default App
