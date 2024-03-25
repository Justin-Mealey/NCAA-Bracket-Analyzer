import { Routes, Route } from 'react-router-dom'
import Bracket from "./Bracket.js"
import Results from "./Results.js"

export default function App() {
    return (
        <div className="App">
            <Routes>
                <Route exact path='/' element={<Bracket />} />
                <Route exact path='/results' element={<Results/>} />
            </Routes>
        </div>
    )
}