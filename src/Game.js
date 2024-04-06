import "./Game.css"

export default function Game({top, bottom, id, handleWinner}){
    let game = "game" + id;

    return(<div className={game}>
        <button class="glow-on-hover" type="button" value={top} onClick={()=>handleWinner(id, top)}>{top}</button>
        <button class="glow-on-hover" type="button" value={bottom} onClick={()=>handleWinner(id, bottom)}>{bottom}</button>
    </div>)
}