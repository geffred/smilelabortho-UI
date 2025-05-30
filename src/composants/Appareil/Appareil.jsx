import './Appareil.css'
import buy from '/image/buy.svg'
import edit from "/image/edit.svg"
import trash from "/image/trash.svg"
import { NavLink } from 'react-router-dom'
import imagepen from "/image/image-pen.svg"

// eslint-disable-next-line react/prop-types
function Appareil({ data, dashboard = true , handleDelete , handleEdit , handleClick}){



    return(
        
            <div className='Appareil'>

                <div className={dashboard ? 'dashboard' : 'dashboard hide'}>
                    
                        <a>
                            <img src={imagepen} alt="picture" width={25} onClick={()=>handleClick(data.id)} />
                        </a>
                   
                    
                        <a href='#top'>
                            <img src={edit} alt="edit" width={20} onClick={()=>handleEdit(data)} />
                        </a>
                 
                    <a className='delete'>
                        <img src={trash} alt="trash" width={20} onClick={()=>handleDelete(data.id)} />
                    </a>
                </div>

                    <div className='content'>
                    <div className='cover'>
                        <img src={data.thumbnail} alt="cover_appareil" />
                    </div>
                    <p>
                        {data.nom}     
                    </p>
                    <span> {data.prixUnitaire} € </span>
                    <div className='btn'>
                        <NavLink to={"/Appareils/"+data.id}> 
                            <span>Ajouter au Panier</span>
                            <img src={buy} alt="buy_icon" width={25} />
                        </NavLink>
                       
                    </div>
                </div>
            </div>
       
    )
}

export default Appareil;