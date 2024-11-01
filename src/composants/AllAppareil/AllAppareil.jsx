import './AllAppareil.css';
import useSWR, { mutate } from 'swr';
import Spinner from '../Spinner/Spinner';
import Appareil from '../Appareil/Appareil';
import AppareilInput from '../AppareilInput/AppareilInput';
import AppareilImage from '../AllImageAppareil/AppareilImage';
import { useState } from 'react';

function AllAppareil({ isDashboard = true }) {
    const url = `/api/appareils/`;
    const [id, setId] = useState(0);
    const [imageActive, setImageActive] = useState(false);
    const [display, setDisplay] = useState(false);
    const [editData, setEditData] = useState({});

    const fetcher = (url) => fetch(url).then((res) => res.json());
    const { data, error } = useSWR(url, fetcher);

    const handleClick = (id) => {
        setId(id);
        setImageActive(!imageActive);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${url}delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                mutate(url);
                console.log('Item supprimé avec succès');
            } else {
                console.error("Erreur lors de la suppression de l'élément");
            }
        } catch (error) {
            console.error('Erreur réseau :', error);
        }
    };

    const handleEdit = (data) => {
        setDisplay(true);
        setEditData(data);
    };

    if (error) return <p>Une erreur s'est produite : {error.message}</p>;
    if (!data) return <Spinner />;

    return (
        <div className='AllAppareil'>
            <AppareilInput
                onMutate={() => mutate(url)}
                isDashboard={isDashboard}
                display={display}
                setDisplay={() => setDisplay((prev) => !prev)}
                editData={editData}
                reinitialiser={() => setEditData({})}
            />

            <AppareilImage id={id} />

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
    );
}

export default AllAppareil;
