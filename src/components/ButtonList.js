import Button from "./Button";

const ButtonList = () =>{
    const list = ["All", "Game", "Music","Comedy","IPL","Football","Sports","Live","Cooking", "Valentines", "Playlist", "Movies", "Hit Songs"]
    return (
        <div className="flex">
            {list.map((item , index) =>(
                <Button key={index} name={item}/>
            ))}
       </div>
    );
};
export default ButtonList;