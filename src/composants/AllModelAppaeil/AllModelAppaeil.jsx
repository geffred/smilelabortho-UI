
import ModelAppareilInput from '../ModelAppareilInput/ModelAppareilInput';
import './AllModelAppaeil.css'
import Spinner from "../Spinner/Spinner"
import useSWR, { mutate } from 'swr';
import { useState } from "react"; 
import edit from "/image/edit.svg"
import trash from "/image/trash.svg"
import Notification from "../Notification/Notification"; 

function AllModelAppaeil(){

    const fetcher = (url) => fetch(url).then((res) => res.json());
    const url = `/api/models/`;
    const { data, error, isLoading } = useSWR(url,fetcher);
    const [display, setDisplay] = useState(false);
    const [editData, setEditData] = useState({ nom: "", coutSupplementaire: "" }); 
    const [notification, setNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');

    const handleDelete = async (id) => { 
        setNotification(false);       
        try {
            const response = await fetch(`${url}delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                mutate(url)
                setNotificationMessage('Catégorie supprimé avec succès');
                setNotification(true)
            } else {
                setNotificationMessage('Erreur lors de la suppression de la catégorie');
                setNotification(true)
            }
        } catch (error) {
            setNotification(true)
            setNotificationMessage('Erreur réseau');
        }
    };

    async function handleEdit(data) {
        setDisplay(true);
        setEditData(data);
        console.log(data);
      }


    if (error) return "Une erreur s'est produite.";
    if (isLoading) return <Spinner/>

    return(
        <><Notification active={notification} message={notificationMessage}/>
        <div className="container-fluid AllOptions">
            <ModelAppareilInput
                display={display}
                setDisplay={()=>{setDisplay(!display)}}
                editData={editData}
                reinitialiser={()=>setEditData({ nom: "",coutSupplementaire: "" })}
                onMutate={()=>mutate(url)}
            />

            <table className='table  table-bordered listModelAppareil'>
                <thead>
                    <tr>
                        <th scope="col">N <sup>o</sup> </th>
                        <th scope="col">Model Appareil</th>
                        <th scope="col">coût</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((modelAppareil) => (
                            <tr key={modelAppareil.id} className='modelAppareil'>
                                <td>{modelAppareil.id}</td>
                                <td>{modelAppareil.nom}</td>
                                <td>{modelAppareil.coutSupplementaire} € </td>
                                <td>
                                    <div className="actions">
                                        <a href='#top'>
                                            <img src={edit} alt="edit" width={20} onClick={()=>handleEdit(modelAppareil)} />
                                        </a>
                                    
                                        <a className='delete'>
                                            <img src={trash} alt="trash" width={20} onClick={()=>handleDelete(modelAppareil.id)} />
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
        </>
    )
}

export default AllModelAppaeil;