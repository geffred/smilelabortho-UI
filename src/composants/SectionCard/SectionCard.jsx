
import { NavLink } from 'react-router-dom';
import './SectionCard.css'
import bg from '../../assets/process.png'
import arrow from "/image/arrow-right.svg"

// eslint-disable-next-line react/prop-types
function SectionCard({title,description}){
    return(
        <div className='SectionCard'>
            <h1> {title} </h1>

            <p> {description} </p>
            <div>
                <span>Consulter</span>
                <img src={arrow} alt="arrow_icon" width={20} />
            </div>
        </div>
    )
}

export default SectionCard;