import ChatMessage from "./ChatMessage";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {closeMenu} from "../utils/appSlice";
import {addMessage} from "../utils/chatSlice";
import {generateRandomName, makeRandomMessage} from "../utils/helper";

const LiveChatButton = () =>{
    const [liveMessage, setLiveMessage] = useState("");

    const dispatch = useDispatch();
    const chatMessages = useSelector((store)=> store.chat.messages)
    useEffect(()=>{
        const i = setInterval(()=>{
            //API Polling
            console.log("LiveChatButton");
            dispatch(addMessage({
                name: generateRandomName(),
                message:makeRandomMessage(20),
            }));
        },1500);
        return () => clearInterval(i);
    })


    return (
        <>
            <div className="ml-2 w-full h-[500px] p-4 border border-black bg-slate-100 rounded-lg overflow-y-scroll flex flex-col-reverse">
                <div>
                    {chatMessages.map((m, index) => (
                    <ChatMessage key={index} name={m.name} message={m.message} />
                ))}
                </div>
            </div>
            <form className="w-full p-2 ml-2 border border-black rounded-lg flex" onSubmit={(e)=>{
                e.preventDefault();
                dispatch(addMessage({
                    name: "you",
                    message:liveMessage,
                }))
                setLiveMessage("")
            }}>
                <input className="w-96 px-2" type="text" value={liveMessage} onChange={(e) => setLiveMessage(e.target.value)} />
                <button className="px-4 mx-4 bg-green-100 rounded-lg">Send</button>
            </form>
        </>
    )
}
export default LiveChatButton