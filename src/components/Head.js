import {Hamburger_Icon, User_Icon, Youtube_Logo, YOUTUBE_SEARCH_API, Youtube_Video_API} from "../utils/constants";
import {useDispatch, useSelector} from "react-redux";
import {toggleMenu} from "../utils/appSlice";
import {useEffect, useState} from "react";
import {cacheResult} from "../utils/searchSlice";

const Head = () => {

    const [searchQuery, setSearchQuery ] = useState("");
    const [suggestions, setSuggestions ] = useState([]);
    const [showSuggestions, setShowSuggestions ] = useState(false);

    const searchCache = useSelector(state => state.search);
    const dispatch = useDispatch();
    useEffect(() => {
        // use debouncing....i.e...make api call if time of pressing keys is less than a certain time
        // console.log(searchQuery);
        //make call after every letter & make api call if typing <200ms
        //decline api call

        const timer = setTimeout(()=>{
            if(searchCache[searchQuery]){
                setSuggestions(searchCache[searchQuery]);
            }else{
                getSearchSuggestions()
            }
        },200);

        return () => {
            clearTimeout(timer);
        }

    },[searchQuery]);

    const getSearchSuggestions = async () =>{
        const data = await fetch("http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q="+searchQuery+"&key="+ process.env.REACT_APP_GOOGLE_API_KEY_2);
        const json = await data.json();
        // console.log("data "+ json[1]);
        setSuggestions((json[1]));

        // update cache
        dispatch(cacheResult({
            [searchQuery]: json[1],
        }));
    }
    const toggleMenuHandler =()=>{
        dispatch(toggleMenu());
    }


    return (
        <div className="grid grid-flow-col p-3 m-2 shadow-lg rounded-b-lg">
            <div className="flex col-span-1 ">
                <img alt="menu"
                     onClick={()=> toggleMenuHandler()}
                     className="w-7 h-7 cursor-pointer " src={Hamburger_Icon}/>
                <img alt="menu" className="h-7 pl-2 mx-1 " src={Youtube_Logo}/>
            </div>
            <div className="col-span-10 px-10 ml-40">
                <div>
                    <input
                        className=" px-5 w-1/2 border border-gray-400 p-1 rounded-l-3xl"
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e?.target?.value)}
                        onFocus={() => setShowSuggestions(true)}
                        onBlur={() => setShowSuggestions(false)}
                    />
                    <button className="border border-gray-400 px-5 py-1 bg-gray-100 rounded-r-3xl">&#128269;</button>
                </div>

                { showSuggestions && (
                <div className=" absolute bg-white py-2 px-2 w-[29.3rem] shadow-lg rounded-lg border border-gray-100">
                    <ul className="">
                        {suggestions && suggestions?.map((s) =>
                            <li key={s} className="shadow-sm py-2 px-1 m-1 hover:bg-gray-100">&#128269; {s}</li>
                        )}
                    </ul>
                </div>
                )}
            </div>

            <div className="flex col-span-2 ">
                <img alt="user" className="h-8 " src={User_Icon}/>
            </div>

        </div>
    )
}
export default Head;