
import "./AllCategorie.css"
import useSWR, { mutate } from 'swr';
import Spinner from "../Spinner/Spinner";
import { useEffect } from "react";
import { useState } from "react";
import CategorieInput from "../CategorieInput/CategorieInput";
import Categorie from "../Categorie/Categorie";

// eslint-disable-next-line react/prop-types
function AllCategorie({ isDashboard = false , style}){
  
    const fetcher = (url) => fetch(url).then((res) => res.json())
    const url = `/api/categories/`;
    const { data, error, isLoading } = useSWR(url,fetcher);
    const [scrolling, setScrolling] = useState(false);
    const [display, setDisplay] = useState(false);
    const [editData, setEditData] = useState({ titre: "", thumbnail: "" }); 

    const handleScroll = () => {
          setScrolling(window.scrollY > 1900); 
    };

    useEffect(() => {
            window.addEventListener('scroll', handleScroll);
            return () => {
              window.removeEventListener('scroll', handleScroll);
            };
          }, []);

    const handleDelete = async (id) => {        
        try {
            const response = await fetch(`${url}delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                mutate(url)
                console.log('Item supprimé avec succès');
            } else {
                console.error('Erreur lors de la suppression de l\'élément');
            }
        } catch (error) {
            console.error('Erreur réseau :', error);
        }
    };

    async function handleEdit(data) {
        setDisplay(true);
        setEditData(data);
      }

    
    if (error) return "Une erreur s'est produite.";
    if (isLoading) return <Spinner/>;


    return(
        <div className={scrolling?"AllCategorie categorie-show":"AllCategorie"} style={style}>
            <CategorieInput
             onMutate={()=>mutate(url)}
             isDashboard={isDashboard}
             display={display}
             setDisplay={()=>{setDisplay(!display)}}
             editData={editData}
             reintialiser={()=>setEditData({ titre: "", thumbnail: "" })}
             />

            <div className="container">
                {
                    data.map((categorie)=> <Categorie
                     key={categorie.id}
                     data={categorie}
                     dashboard={isDashboard}
                     handleDelete={handleDelete}
                     handleEdit={handleEdit}/>)
                }
            </div>
        </div>
    )
}

export default AllCategorie;