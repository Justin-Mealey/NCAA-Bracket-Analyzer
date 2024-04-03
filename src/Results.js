import { useLocation } from 'react-router-dom';

export default function Results() {
    const {state} = useLocation();
    const filledBracket = state && state.data

    return (
        <div>{filledBracket[0][0]}</div>
    )
}