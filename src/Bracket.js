import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Game from "./Game.js"
import "./Bracket.css"

export default function Bracket() {
    
    let initialResults = [];
    for (let i = 0; i < 63; i++){
        switch(i){
            case 31: 
            case 39:
            case 47:
            case 55:
                initialResults.push([null, 1, 16]); //winner, top team, bottom team
                break;
            case 32:
            case 40:
            case 48:
            case 56:
                initialResults.push([null, 8, 9]);
                break;
            case 33:
            case 41:
            case 49:
            case 57:
                initialResults.push([null, 5, 12]);
                break;
            case 34:
            case 42:
            case 50:
            case 58:
                initialResults.push([null, 4, 13]);
                break;
            case 35:
            case 43:
            case 51:
            case 59:
                initialResults.push([null, 6, 11]);
                break;
            case 36:
            case 44:
            case 52:
            case 60:
                initialResults.push([null, 3, 14]);
                break;
            case 37:
            case 45:
            case 53:
            case 61:
                initialResults.push([null, 7, 10]);
                break;
            case 38:
            case 46:
            case 54:
            case 62:
                initialResults.push([null, 2, 15]);
                break;
            default:
                initialResults.push([null, null, null]);
        }
    }

    const[results, setResults] = useState(initialResults);

    function handleResult(id, winner){
        let newResults = [...results];
        let oldWinner = results[id][0];
        if(oldWinner === winner){
            return;
        }
        newResults[id][0] = winner;
        if (id === 0){ //deciding new champion, don't look at further games
            setResults(newResults);
            return;
        }
        
        let nextGameID = Math.floor((id-1)/2);
        if (id%2 === 1){ //determines next games top team
            newResults[nextGameID][1] = winner;
        } 
        else {
            newResults[nextGameID][2] = winner;
        }

        while(true) {
            let nextRoundWinner = newResults[nextGameID][0];
            if (oldWinner === nextRoundWinner){ //change impacted future game, 
                newResults[nextGameID][0] = null; //repick winner for this game with the new options

                //next game's winner is now unknown, so next next game's top or bottom team is unknown
                if(nextGameID%2 == 1){
                    newResults[(nextGameID-1)/2][1] = null; 
                }
                else {
                    if (nextGameID !== 0){ 
                        newResults[(nextGameID-2)/2][2] = null; 
                    }
                }

                nextGameID = Math.floor((nextGameID-1)/2); //recurse on next game
                if (nextGameID <= 0){
                    if (nextGameID === 0){
                        if (newResults[0][0] === oldWinner){
                            newResults[0][0] = null;
                        }
                    }
                    break;
                }
            }
            else{
                break; //this game's winner wasn't impacted, no future game will be impacted
            }
        }

        setResults(newResults);
    }

    const navigate = useNavigate();

    let resultsButton;
    let flattenedResults = [].concat(...results)
    if(flattenedResults.includes(null)){ //bracket not fully filled out
        resultsButton = <div/>
    }
    else{
        resultsButton = <button className="analyzeButton" onClick={() => navigate('/results', {state:{data:results}})}>
            Analyze<br/>Bracket</button>
    }

    return (
    <>
        <div className="title">
            Welcome to the Ultimate Bracketology Resource
        </div>
        <br/>
        <div className="subtitle">
            1) Fill in your bracket completely <br/>
            2) Analyze your bracket and review your results
        </div>
        <div className="championContainer">
            <div className="champBox">Champion:<br/>{results[0][0]}</div>
            {resultsButton}
        </div>
        <Championship id={0} picks={results} handlePick={handleResult}></Championship>
    </>
    )
}

function Championship({id, picks, handlePick}){
    return(<>
        <FinalFour id={2*id+1} picks={picks} handlePick={handlePick}></FinalFour>
        <FinalFour id={2*id+2} picks={picks} handlePick={handlePick}></FinalFour>
        <Game top={picks[id][1]} bottom={picks[id][2]} id={id} handleWinner={handlePick}></Game>
    </>)
}


function FinalFour({id, picks, handlePick}){
    return (<>
        <EliteEight id={2*id+1} picks={picks} handlePick={handlePick}></EliteEight>
        <EliteEight id={2*id+2} picks={picks} handlePick={handlePick}></EliteEight>
        <Game top={picks[id][1]} bottom={picks[id][2]} id={id} handleWinner={handlePick}></Game>
    </>)
}

function EliteEight({id, picks, handlePick}){
    return(<>
        <SweetSixteen id={2*id+1} picks={picks} handlePick={handlePick}></SweetSixteen>
        <SweetSixteen id={2*id+2} picks={picks} handlePick={handlePick}></SweetSixteen>
        <Game top={picks[id][1]} bottom={picks[id][2]} id={id} handleWinner={handlePick}></Game>
    </>)
}

function SweetSixteen({id, picks, handlePick}){

    return(<>
        <Roundof32 id={2*id+1} picks={picks} handlePick={handlePick}></Roundof32>
        <Roundof32 id={2*id+2} picks={picks} handlePick={handlePick}></Roundof32>
        <Game top={picks[id][1]} bottom={picks[id][2]} id={id} handleWinner={handlePick}></Game>
    </>)
}

function Roundof32({id, picks, handlePick}){
    
    return(<>
        <Roundof64 id={2*id+1} picks={picks} handlePick={handlePick}></Roundof64>
        <Roundof64 id={2*id+2} picks={picks} handlePick={handlePick}></Roundof64>
        <Game top={picks[id][1]} bottom={picks[id][2]} id={id} handleWinner={handlePick}></Game>
    </>)
}

function Roundof64({id, picks, handlePick}){
    return (
    <Game top={picks[id][1]} bottom={picks[id][2]} id={id} handleWinner={handlePick}></Game>
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
