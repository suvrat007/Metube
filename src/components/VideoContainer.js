import {useEffect, useState} from "react";
import {Youtube_Video_API} from "../utils/constants";
import VideoCard from "./VideoCard";
import {Link} from "react-router-dom";
import WatchPage from "./WatchPage";

const VideoContainer = () =>{
    const [videos, setVideos] = useState([]);

    const getVideos = async () =>{
        const data = await fetch("https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=IN&maxResults=50&key=AIzaSyDS3uI0RHUne-oEtm6qokqpoRjc1Z61Ik0");
        const json = await data.json();

        setVideos((json?.items))

    };
    useEffect(()=>{
            getVideos();
    },[]);

    if(videos?.length===0){
        return(
            <div>
                loading....
            </div>
        )
    }


    return(
        <div className="flex flex-wrap justify-center h-100">
            {videos.map(video =>(
                <Link key={video.id} to={"/watch?v="+video?.id}>
                    <VideoCard key={video?.id} info={video}/>
                </Link>))}

        </div>
    );
}

export default VideoContainer;