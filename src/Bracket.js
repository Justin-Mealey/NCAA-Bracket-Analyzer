import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Bracket() {

    const navigate = useNavigate()

    return (
        <button onClick={() => navigate('/results')}>Go to results</button>
    )
}