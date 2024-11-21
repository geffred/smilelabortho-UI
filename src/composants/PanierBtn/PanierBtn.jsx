import { useEffect } from "react";
import "./PanierBtn.css"
import panier from "/image/panier.svg"
import { NavLink } from "react-router-dom";
import useSWR, { mutate } from "swr";

function PanierBtn(dependencies){
    useEffect(()=>{
        mutate(url)
    },[dependencies])
    const url = "/api/paniers/"
    const fetcher = (url)=>fetch(url).then((response)=>response.json())
    const {data , error , isLoading } = useSWR(url , fetcher);
    return(
        <NavLink to="/panier" className="PanierBtn">
            <img src={panier} alt="panier_icon" width={25} />
            <span> {data && data.length} </span>
        </NavLink>
    )
}

export default PanierBtn;