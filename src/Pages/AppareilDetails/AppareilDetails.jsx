import NavBar from '../../composants/NavBar/NavBar';
import './AppareilDetails.css'
import ImageDisplay from '../../composants/ImageDisplay/ImageDisplay';
import SectionBanner from '../../composants/SectionBanner/SectionBanner';
import { useParams } from 'react-router-dom';
import Spinner from '../../composants/Spinner/Spinner';
import useSWR from 'swr';
import DetailsInput from '../../composants/DetailsInput/DetailsInput';
import Footer from '../../composants/Footer/Footer';
import AllAppareil from '../../composants/AllAppareil/AllAppareil';


function AppareilDetails(){

    const { id } = useParams();
    const fetcher = (url) => fetch(url).then((res) => res.json())
    const url = `/api/appareils/${id}`;
    const { data, error, isLoading } = useSWR(url,fetcher);

    if (error) return "Une erreur s'est produite.";
    if (isLoading) return <Spinner/>;
    
    return(
        <div className='AppareilDetails'>
            <NavBar 
            
            />
            <SectionBanner
             image={data.thumbnail}
             title={data.nom}
             description={data.description}
             />

            <div className='container my-5'>
                {  data && <div className='row'>
                        <div className='col-lg-6'>
                            <ImageDisplay dataImage={data} />
                        </div>

                        <div className='col-lg-6'>
                            <DetailsInput data={data}/>
                        </div>

                        <div className='col-lg-12'>
                            <div className='similaire'>
                                <h1>Appareils Similaires </h1>
                                <hr />
                            </div>
                            <AllAppareil isDashboard={false} url={'/api/appareils/categories/'+data.categorie} />
                        </div>
                    </div> 

                    
                }
                <div className='row'>
                    
                </div>  
            </div>

            <Footer/>
        </div>
    )
}

export default AppareilDetails;