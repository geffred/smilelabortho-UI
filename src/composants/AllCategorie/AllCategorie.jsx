import Categorie from "../Categorie/Categorie";
import "./AllCategorie.css"
import useSWR, { mutate } from 'swr';
import Spinner from "../Spinner/Spinner";
import { useEffect } from "react";
import { useState } from "react";
import CategorieInput from "../CategorieInput/CategorieInput";

function AllCategorie({ isDashboard = false , style}){
    const fetcher = (url) => fetch(url).then((res) => res.json())
    const url = `/api/categories/`;

    const [scrolling, setScrolling] = useState(false);
    const [display, setDisplay] = useState(false);
    const [editData, setEditData] = useState({ titre: "", thumbnail: "" }); 
    const handleScroll = () => {
          scroll & setScrolling(window.scrollY > 1900); 
    };
    useEffect(() => {
            window.addEventListener('scroll', handleScroll);
            return () => {
              window.removeEventListener('scrolling', handleScroll);
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
        console.log('ddddd'+editData)
        try {
          const response = await fetch(url+"edit/"+data.id, {
            method: 'POST', // Type de la requête HTTP
            headers: {
              'Content-Type': 'application/json', // On précise que l'on envoie des données JSON
            },
            body: JSON.stringify(data), // Convertir les données en JSON pour les envoyer
          });
      
          // Vérification de la réponse du serveur
          if (response.ok) {
            const responseData = await response.json(); // Extraire la réponse JSON du serveur
            mutate(url)
            console.log('Données envoyées avec succès:', responseData);
          } else {
            console.error('Erreur lors de l\'envoi des données:', response.statusText);
          }
        } catch (error) {
          console.error('Erreur réseau:', error);
        }
      }

    const { data, error, isLoading } = useSWR(url,fetcher);
    if (error) return "An error has occurred.";
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
                    data.map((categorie,index)=> <Categorie
                     key={index}
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