import './SectionBanner.css'

function SectionBanner({image , title , description = null }){
    return(
        <div className="SectionBanner">
            <img src={image} alt="banner_icon" />
            <div className='contenu'>
                <h1>
                    {title}
                </h1>
                <p>
                    {description}
                </p>
            </div>
        </div>
    )
}

export default SectionBanner;