import React from 'react';
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

const SideBar = () => {
    const isMenuOpen = useSelector(store => store.app.isMenuOpen);
    if (!isMenuOpen) return null; // early return
    
    return (
        <div className="p-5 shadow-lg w-48 ">
            <ul>
                <li><Link to={"/"}>Home</Link></li>
                <li>Shorts</li>
                <li>Live</li>
                <li>Movies</li>
            </ul>
            <h1 className="font-bold pt-5">Subsciptions</h1>
            <ul>
                <li>Music</li>
                <li>Sports</li>
                <li>Gaming</li>
                <li>Movies</li>
            </ul>
            <h1 className="font-bold pt-5">Watch later</h1>
            <ul>
                <li>Playlists</li>
                <li>Music</li>
                <li>History</li>
                <li>Downloads</li>
            </ul>
        </div>
    );
};
export default SideBar;