import './Categorie.css'
import edit from "/image/edit.svg"
import trash from "/image/trash.svg"
import { HashLink } from 'react-router-hash-link';


function Categorie({ data, dashboard = false , handleDelete , handleEdit}) {

    

    return (
        <div className="Categorie" id= {data.id}>
            <div className={dashboard ? 'dashboard' : 'dashboard hide'}>
                <HashLink smooth to="#top">
                    <button>
                        <img src={edit} alt="edit" width={20} onClick={()=>handleEdit(data)} />
                    </button>
                </HashLink>
                <button className='delete' onClick={() => handleDelete(data.id)}>
                    <img src={trash} alt="trash" width={20} />
                </button>
            </div>
            
            <div className='thumb'>
                <img src={data.thumbnail} alt="thumbnail" className='thumbnail' />
            </div>

            <div className='footerContainer'>
                <img src="/image/arrow-right.svg" alt="arrow" width={25} className='im1' />
                <h1> {data.titre} </h1>
                <img src="/image/arrow-right.svg" alt="arrow" width={25} className='im2' />
            </div>
        </div>
    );
}

export default Categorie;
