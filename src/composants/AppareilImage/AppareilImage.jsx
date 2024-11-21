import { useEffect } from 'react';
import Spinner from '../Spinner/Spinner';
import './AppareilImage.css';
import cancel from '/image/cancel.svg';
import useSWR from 'swr';
import { mutate } from 'swr';

function AppareilImage({ id , isDashboard = false}) {
    
    const url = `/api/image/appareils/${id}`;
    const fetcher = (url) => fetch(url).then((res) => res.json());
    const { data , error} = useSWR(url, fetcher);
    
    const handleDelete = async (imageId) => {        
        try {
            const response = await fetch(`/api/image/appareils/delete/${imageId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                mutate(url); // Rafraîchit les données après suppression
                console.log('Image supprimée avec succès');
            } else {
                console.error("Erreur lors de la suppression de l'image");
            }
        } catch (error) {
            console.error('Erreur réseau :', error);
        }
    };

    if (!data) return <Spinner />;
    if (error) return <div>Erreur lors de la récupération des données</div>;

    return (
        <div className={isDashboard?'AppareilImage':'AppareilImage hide'}>
            {data && data.map((image) => (
                <div className='cover' key={image.id}>
                    <img
                        src={cancel}
                        alt="cancel"
                        className='cancel'
                        width={20}
                        onClick={() => handleDelete(image.id)}
                    />
                    <img src={image.url} alt="cover_appareil" className='im' />
                </div>
            ))}
        </div>
    );
}

export default AppareilImage;
