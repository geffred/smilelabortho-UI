import './Appareil.css'
import cover from '../../assets/process.png'
import shop from '/image/shop.svg'
import buy from '/image/buy.svg'
import edit from "/image/edit.svg"
import trash from "/image/trash.svg"
import { useState } from 'react'

function Appareil({ data, dashboard = true , handleDelete , handleEdit}){



    return(
        <div className='Appareil'>

             <div className={dashboard ? 'dashboard' : 'dashboard hide'}>
                <button  >
                    <img src={edit} alt="edit" width={20} onClick={()=>handleEdit(data)} />
                </button>
                <button >
                    <img src={trash} alt="trash" width={20} onClick={()=>handleDelete(data.id)} />
                </button>
            </div>

           <div className='content'>
                <div className='cover'>
                    <img src={data.thumbnail} alt="cover_appareil" />
                </div>
                <p>
                    {data.nom}     
                </p>
                <div className='btn'>
                    <a href="">
                        <span className='mx-1'> {data.prixUnitaire} € </span>
                        <span>Commader</span>
                        <img src={shop} alt="buy_icon" width={20} />
                        </a>
                    <a href="">
                        <span>Ajouter au Panier</span>
                        <img src={buy} alt="buy_icon" width={25} />
                    </a>
                </div>
           </div>
        </div>
    )
}

export default Appareil;