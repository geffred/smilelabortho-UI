import Navbar from "../../composants/NavBar/NavBar"
import SectionBanner from "../../composants/SectionBanner/SectionBanner"
import banner from "../../assets/process.png"
import ShopMenu from "../../composants/ShopMenu/ShopMenu";
import { useEffect, useState } from "react";
import Display from "../../composants/Display/Display";
import AllAppareil from "../../composants/AllAppareil/AllAppareil"
import "./shop.css"
import Footer from "../../composants/Footer/Footer"
import { useParams } from "react-router-dom";

function Shop(){

  const {id} = useParams()
  const [active , setActive] = useState(0);
  const [url, setUrl] = useState("/api/appareils/")

  useEffect(() =>{
    if(id){
      setActive(parseInt(id));
      setUrl("/api/appareils/categories/"+id);}
    else setActive(0)
  },[])

  
  const handleClick = (select) => {
    setActive(select);
    if(select !== 0) setUrl("/api/appareils/categories/" + select)
    if(select === 0) setUrl("/api/appareils/")
  }
  const handleChange = (e) => {
    console.log(e.target.value)
    if(e.target.value === "") {setUrl("/api/appareils/") ; setActive(0)}
    else setUrl("/api/appareils/search/"+e.target.value)
  }
    return (
        <div className="shop-page">
          <Navbar/>
          <SectionBanner
           title={"shop"}
           image={banner}
           style={{height:"200px", alignItems:"end"}}
            /> 
          <form action="" className="row">
              <div className="form-group col-lg-12 my-0">
                  <input
                 type="text"
                  className="form-control py-2"
                  onChange={handleChange}
                  placeholder="Recherche..."/>
              </div>
          </form>
          <div className="container-fluid ">
              <div className="row">

                <div className="col-lg-3 px-0 categorie-menu">
                  <ShopMenu isActive={active} handleClick={handleClick}/>   
                </div>

                <div className="col-lg-9 appareils-box">
                  <Display>
                    <AllAppareil isDashboard = {false} url={url} />
                  </Display>
                </div>
                
              </div>
          </div>
          <Footer/>
        </div>
    )
}

export default Shop;