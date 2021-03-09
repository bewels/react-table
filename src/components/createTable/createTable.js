import React, { useState } from 'react';

import Table from '../table/table'

import './createTable.css'

export default function CreateTable({create, setCreate, createTable, table, pageId, setPageId, setColumn}) {
    const [paramTabel, setParamTabel] = useState({name: '', width: '', height: ''})


    const setSize = () => {
        if (!+paramTabel.width || !+paramTabel.height || !paramTabel.name){
            return
        }
        createTable(paramTabel)
        setCreate(true)
    }

    if (!create) {
        return (
        <>
            <div className="create-form">
                <form>
                    <input 
                        value={paramTabel.name} 
                        onChange={(e) => setParamTabel({...paramTabel, name:e.target.value})} 
                        type="text" 
                        id="name" 
                        className="form-control table-form-input"
                        required
                        placeholder="Имя таблиы"
                    />
                    <label htmlFor="width">Ширина</label>
                    <input 
                        value={paramTabel.width} 
                        onChange={(e) => setParamTabel({...paramTabel, width:e.target.value})} 
                        type="text" 
                        id="width" 
                        className="form-control table-form-input"
                        required
                        placeholder="Ширина"
                    />
                    <label htmlFor="height">Высота</label>
                    <input 
                        value={paramTabel.height} 
                        onChange={(e) => setParamTabel({...paramTabel, height:e.target.value})} 
                        type="text" 
                        className="form-control table-form-input"
                        id="height" 
                        required
                        placeholder="Высота"
                    />
                    <button className="btn create-btn" onClick={setSize}>Создать таблицу</button>
                </form>
            </div>
        </>
        )
    }
    return <Table table={table} pageId={pageId} setPageId={setPageId} width={paramTabel.width} height={paramTabel.height} setColumn={setColumn}/>
}
