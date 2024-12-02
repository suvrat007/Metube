import {User_Icon} from "../utils/constants";


const ChatMessage = ({name, message}) =>{
    return (
        <div className="flex items-center shadow-sm p-2 ">
            <img src={User_Icon}
                 alt="User" className="h-8"/>
            <span className="font-bold px-2">{name}</span>
            <span>{message}</span>

        </div>

    )
}
export default ChatMessage;