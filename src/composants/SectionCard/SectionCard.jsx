
import { NavLink } from 'react-router-dom';
import './SectionCard.css'
import bg from '../../assets/process.png'

// eslint-disable-next-line react/prop-types
function SectionCard({title,description}){
    return(
        <div className='SectionCard'>
            <img src={bg} alt="" />
           <NavLink>
            <h1> {title} </h1>

                <p> {description} </p>
           </NavLink>

        </div>
    )
}

export default SectionCard;