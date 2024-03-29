import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Game from "./Game.js"
import "./Bracket.css"

export default function Bracket() {

    let initialResults = [];
    for (let i = 0; i < 63; i++){
        initialResults.push(null);
    }
    const[results, setResults] = useState(initialResults);

    function handleResult(id, winner){
        let newResults = [...results];
        let oldWinner = results[id];
        if(oldWinner === winner){
            return;
        }
        newResults[id] = winner;
        //any game impacted by change gets properly reset, user must update bracket with new winner
        let i = id;
        if(i === 0){ //deciding new champion, avoid looping, no further games
            setResults(newResults);
            return;
        }
        while (true){
            i = Math.floor((i-1)/2);
            let nextRoundWinner = results[i];
            if (oldWinner === nextRoundWinner){ //change impacted future game, 
                newResults[i] = null; //repick winner for this game with the new options
            }
            if (i === 0){
                break;
            }
        }
        setResults(newResults);
    }

    const navigate = useNavigate();
    return (<>
        <div className="championContainer">
            <div className="champBox">Champion:<br/>{results[0]}</div>
            <button className="analyzeButton" onClick={() => navigate('/results')}>Analyze<br/>Bracket</button>
        </div>
        <Championship id={0} picks={results} handlePick={handleResult}></Championship>
    </>)
}

function Championship({id, picks, handlePick}){
    return(<>
        <FinalFour id={2*id+1} picks={picks} handlePick={handlePick}></FinalFour>
        <FinalFour id={2*id+2} picks={picks} handlePick={handlePick}></FinalFour>
        <Game top={picks[2*id+1]} bottom={picks[2*id+2]} id={id} handleWinner={handlePick}></Game>
    </>)
}


function FinalFour({id, picks, handlePick}){
    return (<>
        <EliteEight id={2*id+1} picks={picks} handlePick={handlePick}></EliteEight>
        <EliteEight id={2*id+2} picks={picks} handlePick={handlePick}></EliteEight>
        <Game top={picks[2*id+1]} bottom={picks[2*id+2]} id={id} handleWinner={handlePick}></Game>
    </>)
}

function EliteEight({id, picks, handlePick}){
    return(<>
        <SweetSixteen id={2*id+1} picks={picks} handlePick={handlePick}></SweetSixteen>
        <SweetSixteen id={2*id+2} picks={picks} handlePick={handlePick}></SweetSixteen>
        <Game top={picks[2*id+1]} bottom={picks[2*id+2]} id={id} handleWinner={handlePick}></Game>
    </>)
}

function SweetSixteen({id, picks, handlePick}){

    return(<>
        <Roundof32 id={2*id+1} picks={picks} handlePick={handlePick}></Roundof32>
        <Roundof32 id={2*id+2} picks={picks} handlePick={handlePick}></Roundof32>
        <Game top={picks[2*id+1]} bottom={picks[2*id+2]} id={id} handleWinner={handlePick}></Game>
    </>)
}

function Roundof32({id, picks, handlePick}){
    
    return(<>
        <Roundof64 id={2*id+1} picks={picks} handlePick={handlePick}></Roundof64>
        <Roundof64 id={2*id+2} picks={picks} handlePick={handlePick}></Roundof64>
        <Game top={picks[2*id+1]} bottom={picks[2*id+2]} id={id} handleWinner={handlePick}></Game>
    </>)
}

function Roundof64({id, picks, handlePick}){
    let matchups = [[1, 16], [8,9], [5,12], [4,13], [6,11], [3,14], [7,10], [2,15]];
    let index = (id+1) % 8;

    return (
    <Game top={matchups[index][0]} bottom={matchups[index][1]} id={id} handleWinner={handlePick}></Game>
    )
}

/* 
Matchup ID corresponds to results array containing winners, this graphic is for 1/4 of bracket
31
    15
32
        7
33
    16
34
                3 (This is an Elite Eight component, two teams are in this matchup, winner goes to final four)
35
    17
36
        8
37
    18
38

results[31] will hold the winner of the 1 vs 16 game in this fourth of the bracket

Championship/FF/EE layout:
3               5
    1   0   2
4               6
*/
