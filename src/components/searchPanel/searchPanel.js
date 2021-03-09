import React, { useState } from 'react'

export default function SearchPanel({onSearch}) {
    const [term, setTerm] = useState('')

    const a = (e) => {
        const term = e.target.value
        setTerm(term)
        onSearch(term)
    }

    return (
        <input 
            value={term}
            onChange={a}
            type="text"
            placeholder='Поиск'
        />
    )
}