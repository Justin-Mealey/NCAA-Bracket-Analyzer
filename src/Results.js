import { useLocation } from 'react-router-dom';
import "./Results.css"

export default function Results() {
    const {state} = useLocation();
    const filledBracket = state && state.data
    
    const firstRound = filledBracket.slice(31);
    const secondRound = filledBracket.slice(15, 31);
    const sweetSixteen = filledBracket.slice(7, 15);
    const eliteEight = filledBracket.slice(3, 7);
    const finalFour = filledBracket.slice(1, 3);
    const championship = filledBracket[0];

    function calculateUpsetAmount(game){ //If the 4 beat the 13, ret -9, if 13 upset 4 ret 9
        const winner = game[0];
        let underdog; 
        let favored;
        if (game[1] > game[2]){
            underdog = game[1];
            favored = game[2];
        }
        else {
            underdog = game[2];
            favored = game[1];
        }
        
        if (underdog === winner){
            return underdog - favored;
        }
        else {
            return favored - underdog;
        }
    }

    let score = 100; //minor issue will subtract 3, major 6, score will be between 40%-100%
    
    //all stats numbered below
    function stat1(){ //Number of severe upsets - 8.5 (severe meaning 5 or more difference)
        let severeUpsets = 0;
        for (let i = 0; i < filledBracket.length; i++){
            if (calculateUpsetAmount(filledBracket[i]) >= 5){
                severeUpsets++;
            }
        }
        
        let status;
        let words;
        if (7 <= severeUpsets && severeUpsets <= 10){
            status = "good";
            words = severeUpsets + " severe upsets";
        }
        else if (5 <= severeUpsets && severeUpsets <= 12){
            score -= 3;
            status = "mid";
            words = severeUpsets + " severe upsets, for best score pick 7 to 10";
        }
        else {
            score -= 6;
            status = "bad";
            words = severeUpsets + " severe upsets, for best score pick 7 to 10";
        }

        return {
            indicator: status,
            statement: words,
        }; 
    }

    function stat2(){ //Number of upsets - 20
        let upsets = 0;
        for (let i = 0; i < filledBracket.length; i++){
            if (calculateUpsetAmount(filledBracket[i]) > 0){
                upsets++;
            }
        }
        
        let status;
        let words;
        if (17 <= upsets && upsets <= 23){
            status = "good";
            words = upsets + " upsets";
        }
        else if (14 <= upsets && upsets <= 26){
            score -= 3;
            status = "mid";
            words = upsets + " upsets, for best score pick 17 to 23";
        }
        else {
            score -= 6;
            status = "bad";
            words = upsets + " upsets, for best score pick 17 to 23";
        }

        return {
            indicator: status,
            statement: words,
        };
    }

    function stat3(){ //Number of first round upsets - 8.3
        let firstRoundUpsets = 0;
        for (let i = 0; i < firstRound.length; i++){
            if (calculateUpsetAmount(firstRound[i]) > 0){
                firstRoundUpsets++;
            }
        }
        
        let status;
        let words;
        if (7 <= firstRoundUpsets && firstRoundUpsets <= 9){
            status = "good";
            words = firstRoundUpsets + " first round upsets";
        }
        else if (5 <= firstRoundUpsets && firstRoundUpsets <= 11){
            score -= 3;
            status = "mid";
            words = firstRoundUpsets + " first round upsets, for best score pick 7 to 9";
        }
        else {
            score -= 6;
            status = "bad";
            words = firstRoundUpsets + " first round upsets, for best score pick 7 to 9";
        }

        return {
            indicator: status,
            statement: words,
        };
    }

    function stat4(){ //16 vs 1 upset: 1.32%, 15 vs 2 upset: 7.24%
        let sixteenPicked = false;
        let fifteenPicked = false;
        for (let i = 0; i < firstRound.length; i++){
            if (firstRound[i][0] === 16){
                sixteenPicked = true;
            }
            else if (firstRound[i][0] === 15){
                fifteenPicked = true;
            }
        }
        
        let status;
        let words;
        if (sixteenPicked){
            score -= 6;
            status = "bad";
            words = "Do not pick a 16 seed in the first round";
        }
        else if (fifteenPicked){
            score -= 3;
            status = "mid";
            words = "Do not pick a 15 seed in the first round";
        }
        else {
            status = "good";
            words = "No 15 or 16 seeds picked in the first round";
        }

        return {
            indicator: status,
            statement: words,
        };
    }

    function stat5(){ //14 or 16 winning second round - 9%, 14, 16 or 9 winning second round - 19%
        let ninePicked = false;
        let fourteenPicked = false;
        let sixteenPicked = false;
        for (let i = 0; i < secondRound.length; i++){
            if (secondRound[i][0] === 9){
                ninePicked = true;
            }
            else if (secondRound[i][0] === 14){
                fourteenPicked = true;
            }
            else if (secondRound[i][0] === 16){
                sixteenPicked = true;
            }
            
        }
        
        let status;
        let words;
        if (fourteenPicked || sixteenPicked){
            score -= 6;
            status = "bad";
            words = "Do not pick a 14 or 16 seed in the second round";
        }
        else if (ninePicked){
            score -= 3;
            status = "mid";
            words = "Do not pick a 9 seed in the second round";
        }
        else {
            status = "good";
            words = "No 9, 14 or 16 seeds picked in the second round";
        }

        return {
            indicator: status,
            statement: words,
        };
    }

    function stat6(){ //Odds champion is 5 seed or below - 9%, odds champ is 4 or below - 14%
        
        let status;
        let words;
        if (championship[0] >= 5){
            score -= 6;
            status = "bad";
            words = "Your champion is a " + championship[0] + " seed, for best score pick a 1, 2, or 3 seed";
        }
        else if (championship[0] >= 4){
            score -= 3;
            status = "mid";
            words = "Your champion is a " + championship[0] + " seed, for best score pick a 1, 2, or 3 seed";
        }
        else {
            status = "good";
            words = "Picked a " + championship[0] + " seed as your champion";
        }

        return {
            indicator: status,
            statement: words,
        };
    }

    function stat7(){ //Elite Eight severe upsets - 0.31
        let severeUpsets = 0;
        for (let i = 0; i < eliteEight.length; i++){
            if (calculateUpsetAmount(eliteEight[i]) >= 5){
                severeUpsets++;
            }
        }

        let status;
        let words;
        if (0 <= severeUpsets && severeUpsets <= 1){
            status = "good";
            words = severeUpsets + " Elite Eight severe upsets";
        }
        else if (2 <= severeUpsets && severeUpsets <= 3){
            score -= 3;
            status = "mid";
            words = severeUpsets + " Elite Eight severe upsets, for best score pick 0 or 1";
        }
        else {
            score -= 6;
            status = "bad";
            words = severeUpsets + " Elite Eight severe upsets, for best score pick 0 or 1";
        }

        return {
            indicator: status,
            statement: words,
        }; 
    }

    function stat8(){ //Sweet Sixteen severe upsets - 0.26
        let severeUpsets = 0;
        for (let i = 0; i < sweetSixteen.length; i++){
            if (calculateUpsetAmount(sweetSixteen[i]) >= 5){
                severeUpsets++;
            }
        }

        let status;
        let words;
        if (0 <= severeUpsets && severeUpsets <= 1){
            status = "good";
            words = severeUpsets + " Sweet Sixteen severe upsets";
        }
        else if (2 <= severeUpsets && severeUpsets <= 3){
            score -= 3;
            status = "mid";
            words = severeUpsets + " Sweet Sixteen severe upsets, for best score pick 0 or 1";
        }
        else {
            score -= 6;
            status = "bad";
            words = severeUpsets + " Sweet Sixteen severe upsets, for best score pick 0 or 1";
        }

        return {
            indicator: status,
            statement: words,
        }; 
    }

    function stat9(){ //9 seed or worse in Final Four - 5.3%, 6 seed or worse in Final Four - 13.2%
        let finalFourTeams = [];
        finalFourTeams.push(finalFour[0][1]);
        finalFourTeams.push(finalFour[0][2]);
        finalFourTeams.push(finalFour[1][1]);
        finalFourTeams.push(finalFour[1][2]);

        let nineOrWorseSeed;
        let nineOrWorseBool = false;
        let sixOrWorseSeed;
        let sixOrWorseBool = false;
        for (let i = 0; i < finalFourTeams.length; i++){
            if (finalFourTeams[i] >= 9){
                nineOrWorseSeed = finalFourTeams[i];
                nineOrWorseBool = true;
            }
            else if (finalFourTeams[i] >= 6){
                sixOrWorseSeed = finalFourTeams[i];
                sixOrWorseBool = true;
            }
        }

        let status;
        let words;
        if (nineOrWorseBool){
            score -= 6;
            status = "bad";
            words = "Picked a " + nineOrWorseSeed + " seed to make the Final Four, for best score pick no worse than a 5";
        }
        else if (sixOrWorseBool){
            score -= 3;
            status = "mid";
            words = "Picked a " + sixOrWorseSeed + " seed to make the Final Four, for best score pick no worse than a 5";
        }
        else {
            status = "good";
            words = "Picked only 5 or higher seeds to make Final Four";
        }

        return {
            indicator: status,
            statement: words,
        }; 
    }

    function stat10(){ //Sum of Final Four seeds - 7.5
        let finalFourTeams = [];
        finalFourTeams.push(finalFour[0][1]);
        finalFourTeams.push(finalFour[0][2]);
        finalFourTeams.push(finalFour[1][1]);
        finalFourTeams.push(finalFour[1][2]);

        let sumOfSeeds = 0;
        for (let i = 0; i < finalFourTeams.length; i++){
            sumOfSeeds += finalFourTeams[i];
        }

        let status;
        let words;
        if (6 <= sumOfSeeds && sumOfSeeds <= 9){
            status = "good";
            words = "Sum of Final Four seeds is " + sumOfSeeds;
        }
        else if (4 <= sumOfSeeds && sumOfSeeds <= 11){
            score -= 3;
            status = "mid";
            words = "Sum of Final Four seeds is " + sumOfSeeds + ", for best score sum should be from 6 to 9";
        }
        else {
            score -= 6;
            status = "bad";
            words = "Sum of Final Four seeds is " + sumOfSeeds + ", for best score sum should be from 6 to 9";
        }

        return {
            indicator: status,
            statement: words,
        }; 
    }

    let results = [];
    results.push(stat1());
    results.push(stat2());
    results.push(stat3());
    results.push(stat4());
    results.push(stat5());
    results.push(stat6());
    results.push(stat7());
    results.push(stat8());
    results.push(stat9());
    results.push(stat10());

    return (<>
        <div>
            <h1>Your Results:<br/>{score}%</h1>
            <p>A severe upset is defined as the winning team being at least 5 seeds lower, 
                whereas a normal upset is at least 1 seed lower.
            </p>
        </div>
        <div className="container">
            <div>
                <h2>Ideal Qualities:</h2>
                <ul>
                    {results.map((result) => result.indicator === "good" && <li>{result.statement}</li>)}
                </ul>
            </div>
            <div>
                <h2>Minor Improvements:</h2>
                <ul>
                    {results.map((result) => result.indicator === "mid" && <li>{result.statement}</li>)}
                </ul>
            </div>
            <div>
                <h2>Major Improvements:</h2>
                <ul>
                    {results.map((result) => result.indicator === "bad" && <li>{result.statement}</li>)}
                </ul>
            </div>
        </div>
    </>
    )
}

/* HISTORICAL DATA (1985 to present)
1) Number of severe upsets - 8.5 (severe meaning 5 or more difference)
2) Number of upsets - 20
3) Number of first round upsets - 8.3
4) 16 vs 1 upset: 1.32%, 15 vs 2 upset: 7.24%
5) 14 or 16 winning second round - 9%, 14, 16 or 9 winning second round - 19%
6) Odds champion is 5 seed or below - 9%, odds champ is 4 or below - 14%
7) Elite Eight severe upsets - 0.31 
8) Sweet Sixteen severe upsets - 0.26
9) 9 seed or worse in Final Four - 5.3%, 6 seed or worse in Final Four - 13.2%
10) Sum of Final Four seeds - 7.5
*/
