import "./ListAdresses.css"
import home from "/image/home.svg";
const AdressCard = ()=>{
    return (
      <div className="adressCard">
        <div className="icon">
          <img src={home} alt="home_icon" width={80} />
        </div>

        <div className="content">
          <ul>
            <li> Smile Lab </li>
            <li className="items">
              <span> Rue de la fonderie </span>
              <span> 10 </span>
            </li>
            <li className="items">
              <span> 75008 </span>
              <span> Paris </span>
            </li>
            <li> France </li>
          </ul>
        </div>
      </div>
    );
}

function ListAdresses(){

    return <div className="listAdresses">
        <AdressCard />
    </div>;
}

export default ListAdresses;