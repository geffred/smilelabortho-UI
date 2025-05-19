import MessagesList from "./MessageList"
import { UserContext } from "../../composants/UserContext";
import { useContext, useState } from "react";
function Messages(){
     const {user} = useContext(UserContext)
    return (
      <div>
        <MessagesList currentUser={user} />
      </div>
    );
}

export default Messages