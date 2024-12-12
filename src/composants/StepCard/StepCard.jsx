import "./StepCard.css"

function StepCard({data}){
    return (
        <div className="stepCard">
            <h1> {data.num} </h1>
            <img src={data.img} alt="icon" className="icon-icon" width={80} />
            <h2> {data.titre} </h2>
            <p> {data.description} </p>
        </div>
    )
}

export default StepCard;