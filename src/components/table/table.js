import React, { useState, useRef, useEffect } from 'react'

import './table.css'

export default function Table ({table, pageId, setPageId, width, height, setColumn}) {

    const [fileds, setFileds] = useState([])
    const count = useRef(0)

    useEffect(() => {
        count.current = 0

        const tb = []

        for(let i = 0; i < height; i++){
            const cells = []
            for(let j = 0; j < width; j++){

                cells.push(<td 
                                key={Date.now().toString() + j} 
                                onClick={(e) => setColumn(e, e.target.getAttribute('id'))} 
                                id={count.current}
                            >{table[pageId].tableContent[count.current]}</td>)

                            count.current++
            }

            tb.push(<tr key={i}>{cells}</tr>)
        }

        setFileds([...tb])
    }, [table[pageId]])

    const columnStr = []
    const button = []

    for(let i = 0; i < table.length; i++){
        button.push(<button key={i} className="btn btn-page" onClick={() => setPageId(i)}>{table[i].name}</button>)
    }

    for(let i = 0; i < width; i++) {
        columnStr.push(<td key={i}>{i+1}</td>)
    }
    


    return (
        <>

            <table border="1" width="100%" height="100%" >
                <caption className="text-center">{table[pageId].name}</caption>
                <thead style={{background: "#fc0"}} align="center">
                    
                    <tr>
                        {columnStr}
                    </tr>
                </thead>
                <tbody>
                {
                    fileds
                }
                </tbody>
            </table>
                <div className="page-tabs">
                    {button}
                </div>
        </>
    )
}