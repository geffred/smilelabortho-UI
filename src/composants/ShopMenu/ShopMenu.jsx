import "./ShopMenu.css"
import right from "/image/arrow-next.svg"
import device from "/image/device.svg"
import useSWR from "swr"
import Spinner from "../Spinner/Spinner"
import teeth from "/image/teeth.svg"

function ShopMenu({handleClick , isActive}){

    const url = `/api/categories/`;
    const fetcher = (url) => fetch(url).then((res) => res.json())
    const { data, error, isLoading } = useSWR(url,fetcher);


    if (error) return "Une erreur s'est produite.";
    if (isLoading) return <Spinner/>;

    return(
        <div className="">
            <nav className="ShopMenu">

                <a href="#" key={0} onClick={()=>handleClick(0)}  className={isActive===0 ? "line top-active ":"line top"}>
                    <div className="icon">
                        <img src={device} alt="Services" width={40} height={40} />
                    </div>
                    <span>{"Tous les Appareils"} </span>
                </a>

                {
                    data.map((info)=>{
                        return <a href="#" key={info.id} onClick={()=>handleClick(info.id)}  className={isActive===info.id ? "line active":"line"}>
                        <div className="icon">
                            <img src={teeth} alt="Services" width={40} height={40} />
                        </div>
                        <span>{info.titre} </span>
                        <img src={right} alt="arrow-right" width={20} className="arrow"/>
                    </a>
                    })
                }

            </nav>
        </div>
    )
}

export default ShopMenu;