import Banner from "./composants/Banner/Banner"
import Footer from "./composants/Footer/Footer"
import NavBar from "./composants/NavBar/NavBar"
import Apropos from "./composants/Apropos/Apropos"
import "./App.css"


function App() {

  return (
    <>
     <div className="app">
        <NavBar/>
        <Banner/>
        <Apropos/> 
        <Footer/> 
     </div>
    </>
  )
}

export default App
