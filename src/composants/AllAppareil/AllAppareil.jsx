import './AllAppareil.css'
import useSWR from 'swr';
import Spinner from '../Spinner/Spinner'
import Appareil from '../Appareil/Appareil';
import { mutate } from 'swr';
import AppareilInput from '../AppareilInput/AppareilInput';
import { useState } from 'react';
import Categorie from '../Categorie/Categorie';

function AllAppareil(isDashboard = true ){

    const url = `/api/appareils/`;
    const fetcher = (url) => fetch(url).then((res) => res.json())
    const { data, error, isLoading } = useSWR(url,fetcher);
    const [display, setDisplay] = useState(false);
    const [editData, setEditData] = useState({ nom: "", thumbnail: "",prixUnitaire:"",categorie:"" }); 

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
        console.log("Form data", data);
      }

    if (error) return "Une erreur s'est produite.";
    if (isLoading) return <Spinner/>;

    return(
        <div className='AllAppareil'>

            <AppareilInput
             onMutate={()=>mutate(url)}
             isDashboard={isDashboard}
             display={display}
             setDisplay={()=>{setDisplay(!display)}}
             editData={editData}
             reintialiser={()=>setEditData({ nom: "", thumbnail: "",prixUnitaire:"",categorie:"" })}
             />

            <div className="container">
                {
                    data.map((appareil)=> <Appareil
                     key={appareil.id}
                     data={appareil}
                     dashboard={isDashboard}
                     handleDelete={handleDelete}
                     handleEdit={handleEdit}
                     />)
                }
            </div>
        </div>
    )
}

export default AllAppareil;