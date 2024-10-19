import Banner from "./composants/Banner/Banner"
import Footer from "./composants/Footer/Footer"
import NavBar from "./composants/NavBar/NavBar"
import "./App.css"


function App() {

  return (
    <>
     <div className="app">
        <NavBar/>
        <Banner/>
        <Footer/> 
     </div>
    </>
  )
}

export default App
