import "./ImageDisplay.css"
import banner from "../../assets/process.png"
import { useState } from "react";
import useSWR from "swr";

function ImageDisplay({dataImage}){

    const [image , setImage] = useState(dataImage.thumbnail)
    const [active , setActive] = useState(null)
    const fetcher = (url) => fetch(url).then((res) => res.json())
    const url = `/api/image/appareils/${dataImage.id}`;
    const { data, error, isLoading } = useSWR(url,fetcher);

    const handleClick = (image) =>{
        setImage(image.url)
        setActive(image.id)
    }

    if(isLoading) return <p>Loading...</p>;
    if(error) return <p>Erreur lors de la récupération des images</p>;

    return(
            <div className='ImageDisplay'>
                <div className='first'>
                    <img src={image} alt="appareil_image" />
                </div>
                <div className='second'>

                    {
                        data && data.map((data) => (
                            <div
                             className={active === data.id ? 'box active' : 'box'}
                             key={data.id}
                             >
                                <div className={active === data.id ? 'bg_hover' : null}></div>
                                <img 
                                src={data.url}
                                alt="appareil_image"
                                onClick={()=>handleClick(data)}
                                />
                            </div>
                        ))
                    }
                </div>
            </div>                 
    )
}

export default ImageDisplay;