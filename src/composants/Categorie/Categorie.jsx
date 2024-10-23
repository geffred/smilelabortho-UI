import './Categorie.css'
import edit from "/image/edit.svg"
import trash from "/image/trash.svg"
import logo from '/image/logo_smilelab_bg.svg'
import { useEffect, useState } from "react";

function Categorie({ data, dashboard = false , handleDelete , handleEdit}) {


    return (
        <div className="Categorie">
            <div className={dashboard ? 'dashboard' : 'dashboard hide'}>
                <button  >
                    <img src={edit} alt="edit" width={20} onClick={()=>handleEdit(data)} />
                </button>
                <button  onClick={() => handleDelete(data.id)}>
                    <img src={trash} alt="trash" width={20} />
                </button>
            </div>

            <img src={logo} alt="logo" width={40} className='logo' />
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
