import { Route } from "react-router-dom"
import { Routes } from "react-router-dom"
import "./App.css"
import Acceuil from "./Pages/Acceuil/Acceuil"
import Services from "./Pages/Services/Services"
import Appareils from "./Pages/Appareils/Appareils"
import Contact from "./Pages/Contact/Contact"
import Shop from "./Pages/Shop/Shop"
import Dashboard from "./Pages/Dashboard/Dashboard"
import AppareilDetails from "./Pages/AppareilDetails/AppareilDetails"
import Inscription from "./Pages/Inscription/Inscription"


function App() {

  return (
    <>
     <Routes>
        <Route index path="/" element={<Acceuil/>} />
        <Route path="/services" element={<Services/>} />
        <Route path="/Contact" element={<Contact/>} />
        <Route path="/Appareils" element={<Appareils/>} />
        <Route path="/Shop" element={<Shop/>} />
        <Route path="/Dashboard" element={<Dashboard/>} />
        <Route path="/Appareils/:id" element={<AppareilDetails/>} />
        <Route path="/shop/:id" element={<Shop/>} />
        <Route path="/inscription" element={<Inscription/>} />
     </Routes>
    </>
  )
}

export default App
