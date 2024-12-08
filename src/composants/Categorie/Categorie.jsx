import { NavLink } from 'react-router-dom';
import './Categorie.css'
import edit from "/image/edit.svg"
import trash from "/image/trash.svg"
import { HashLink } from 'react-router-hash-link';


function Categorie({ data, dashboard = false , handleDelete , handleEdit}) {

    

    return (
        <NavLink to={"/shop/"+data.id}>
        <div className='categorie-wrapper'>
            <div className="Categorie" id= {data.id}>
                <div className={dashboard ? 'dashboard' : 'dashboard hide'}>
                    <button>
                        <img src={edit} alt="edit" width={20} onClick={()=>handleEdit(data)} />
                    </button>
                    <button className='delete' onClick={() => handleDelete(data.id)}>
                        <img src={trash} alt="trash" width={20} />
                    </button>
                </div>
                
                <div className='thumb'>
                    <img src={data.thumbnail} alt="thumbnail" className='thumbnail' />
                </div>
            </div>
            <div className='footerContainer'>
                    <h1> {data.titre} </h1>
            </div>
        </div>
        </NavLink>
    );
}

export default Categorie;
