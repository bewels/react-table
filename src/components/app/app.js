import React, { useRef, useState } from 'react';
import CreateTable from '../createTable/createTable'
import SearchPanel from '../searchPanel/searchPanel'

import './app.css'

export default function App() {
    const mainInput = useRef(null)
    const fieldId = useRef(null)

    const [tables, setTables] = useState([])
    const [create, setCreate] = useState(false)
    const [pageId, setPageId] = useState(0)
    // const term = useState('')



    const selectField = (e) => {
        if (!fieldId || tables.length <= 0){
            console.log('Err');
            return
        }

        const text = {}

        text[fieldId.current] = e.target.value

        const newTable = {...tables[pageId], tableContent: {...tables[pageId].tableContent, ...text}}

        setTables([...tables.slice(0, pageId), newTable, ...tables.slice(pageId + 1)])
    }
    const setColumn = (e, id) => {

        fieldId.current = id
        mainInput.current.value = e.target.textContent
        mainInput.current.focus()

     }

    const createTable = (paramTable) => {
        const {name, width, height} = paramTable
        const filed = {}
        for(let i = 0; i < (height * width); i++){
            filed[i] = ' '
        }
        setTables([...tables, {name: name, tableContent: {...filed}}])
        
    }


    const onStyle = (styles) => {
        if (tables.length === 0) return
        const field = document.getElementById(fieldId.current)
        switch (styles) {
            case 'bold':
                field.classList.toggle('bold')
                return
            case 'italic':
                field.classList.toggle('italic')
                return
            case 'underline':
                field.classList.toggle('underline')
                return
            default:
                return
        }
    }
    
    const onSearch = (term) => {
        if (tables.length > 0) {
            for(let key in tables[pageId].tableContent){
                document.getElementById(key).style.background = ''
                if (tables[pageId].tableContent[key].indexOf(term) > -1 && term != ''){
                    document.getElementById(key).style.background = 'red'
                }
            }
        }
    }

    return (
        <>
            <div className="pagination">
                <div className='container text-center pagination-button'>
                <SearchPanel onSearch={onSearch}/>
                    <i className="bi bi-type-bold btn params-btn" onClick={() => onStyle('bold')}></i>
                    <i className="bi bi-type-italic btn params-btn" onClick={() => onStyle('italic')}></i>
                    <i className="bi bi-type-underline btn params-btn" onClick={() => onStyle('underline')}></i>
                    <i className="bi bi-plus-square btn params-btn" onClick={() => setCreate(false)}></i>
                </div>
            </div>
            <input
                onChange={(e) => {
                    selectField(e)
                }} 
                ref={mainInput} 
                type="text" 
                className="form-control"
            />
            <CreateTable 
                pageId={pageId} 
                setPageId={setPageId} 
                create={create} 
                setCreate={setCreate} 
                table={tables} 
                createTable={createTable}
                setColumn={setColumn}
                />
        </>
    )
}
