import './Notification.css'

function Notification({message , active}){
    return(
        <div className={active?"Notification notification-show":"Notification"}>    
            <p>
                {message}
            </p>
        </div>
    )
}

export default Notification;