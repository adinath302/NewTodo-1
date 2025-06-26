import React, { useEffect, useState } from 'react'

const NewTodo = () => {
    const [Input, setInput] = useState('');
    const [Todo, setTodo] = useState([]);
    console.log(Todo);

    const HandleAddButton = () => {
        if (Input.trim() === "") return;
        const NewInput = {
            id: Date.now(),
            text: Input,
            complete: false,
        }
        setTodo([...Todo, NewInput]);
        setInput('');
    }

    // Getting Item form LocalStorage
    useEffect(() => {
        const StoredData = localStorage.getItem("UserData")
        if (StoredData) {
            setTodo(JSON.parse(StoredData))
        }
    }, [])

    // Set Item To LocalStorage
    useEffect(() => {
        localStorage.setItem("UserData", JSON.stringify(Todo))
    }, [Todo])

    // Complete feature / strick through
    const HandleComplete = (id) => {
        setTodo(
            Todo.map((item) => (item.id === id ? { ...item, complete: !item.complete } : Todo))  // 
        )
    }

    return (
        <div className='flex flex-col justify-center items-center gap-2'>
            <h1>Todo</h1>
            <div className='flex justify-center flex-col items-center'>
                <input
                    required
                    type="text"
                    className='p-2 border'
                    value={Input}
                    onChange={(e) => setInput(e.target.value)} />
                <button
                    className='cursor-pointer p-2 rounded-2xl bg-green-600'
                    onClick={HandleAddButton} >Add</button>
            </div>
            {/* Map Feature  */}
            <ul className='w-[200px] text-center flex items-center justify-center'>
                {
                    Todo.map((item) => {
                        return (
                            <li key={item.id}>
                                <span
                                    onClick={HandleComplete(item.id)}
                                    style={{ textDecoration: item.complete ? "line-though" : "none" }}>
                                    {item.text}
                                </span>
                            </li>
                        )
                    })
                }
            </ul >
        </div >
    )
}

export default NewTodo;