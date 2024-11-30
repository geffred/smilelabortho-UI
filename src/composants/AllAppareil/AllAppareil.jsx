import './AllAppareil.css';
import useSWR, { mutate } from 'swr';
import Spinner from '../Spinner/Spinner';
import Appareil from '../Appareil/Appareil';
import AppareilInput from '../AppareilInput/AppareilInput';
import AppareilImage from '../AppareilImage/AppareilImage';
import { useState } from 'react';
import Notification from '../Notification/Notification';

function AllAppareil({ isDashboard = true , url=`/api/appareils/` }) {

    const [id, setId] = useState(0);
    const [imageActive, setImageActive] = useState(false);
    const [display, setDisplay] = useState(false);
    const [editData, setEditData] = useState({ nom: "", thumbnail: "",prixUnitaire:"",categorie:"",description:"" });

       const fetcher = (url) =>
         fetch(url, {
           method: "GET",
           credentials: "include", // Inclure les cookies dans la requête
         }).then((response) => {
           if (!response.ok) {
             throw new Error("Erreur lors de la récupération des données");
           }
           return response.json();
         });

    const { data, error } = useSWR(url, fetcher);
    const [notification, setNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');

    const handleClick = (id) => {
        setId(id);
        setImageActive(!imageActive);
    };

   const handleDelete = async (id) => {
     try {
       const response = await fetch(`/api/paniers/delete/${id}`, {
         method: "DELETE",
         headers: {
           "Content-Type": "application/json",
         },
         credentials: "include", // Inclut le cookie de session
       });

       if (response.ok) {
         mutate(url); // Rafraîchit les données après suppression
         console.log("Item supprimé avec succès");
       } else {
         console.error("Erreur lors de la suppression de l'item");
       }
     } catch (error) {
       console.error("Erreur réseau :", error);
     }
   };


    const handleEdit = (data) => {
        setDisplay(true);
        setEditData(data);
    };

    if (error) return <p>Une erreur s'est produite : {error.message}</p>;
    if (!data) return <Spinner />;

    return (
        <><Notification active={notification} message={notificationMessage}/>
        <div className='AllAppareil' id='top'>
            <AppareilInput
                onMutate={() => mutate(url)}
                isDashboard={isDashboard}
                display={display}
                setDisplay={() => setDisplay((prev) => !prev)}
                editData={editData}
                reinitialiser={() => setEditData({ nom: "", thumbnail: "",prixUnitaire:"",categorie:"",description:"" })}
            />

            <AppareilImage id={id} isDashboard={isDashboard} />

            <div className="container">
                {data.map((appareil) => (
                    <Appareil
                        key={appareil.id}
                        data={appareil}
                        dashboard={isDashboard}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                        handleClick={handleClick}
                    />
                ))}
            </div>
        </div>
        </>
    );
}

export default AllAppareil;
