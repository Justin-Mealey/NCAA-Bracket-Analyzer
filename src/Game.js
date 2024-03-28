import "./Game.css"

export default function Game({top, bottom, id, handleWinner}){
    return(<div className="gameContainer">
        <button value={top} onClick={()=>handleWinner(id, top)}>{top}</button>
        <button value={bottom} onClick={()=>handleWinner(id, bottom)}>{bottom}</button>
    </div>)
}