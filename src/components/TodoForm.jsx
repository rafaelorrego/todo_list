import React, { useState } from 'react'

const TodoForm = props => {
    const { handleAddTask } = props // destructuring o desestructuracion

    const [tarea, setTarea] = useState("")

    const handleSubmit = (element) => {
        element.preventDefault();
        // console.log(tarea)
        // Crear mi objeto nuevo nuevaTarea
        // lo que va a ir en el body de mi solicitud
        let usuario = 'Julia';
        let nuevaTarea = {
            id: (+new Date).toString(),
            tarea, // tarea: "algo > valor de mi variable de estado tarea"
            done: false
        }
        if(usuario){
            nuevaTarea = {
                ...nuevaTarea,
                usuario
            };
        }
        nuevaTarea = {
            id: (+new Date).toString(),
            tarea, // tarea: "algo > valor de mi variable de estado tarea"
            done: false,
        };
        // Crear el objeto de mi solicitud
        const datosSolicitud = {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(nuevaTarea)
        }
        handleAddTask(nuevaTarea);
        // fetch(url, datosSolicitud)
    
        const handlePostReq = async () => {
            const request = await fetch(
                new Request('http://localhost:3001/tarea'), 
                datosSolicitud
            )
            const data = await request.json();
            console.log("data", data);
        }
        handlePostReq();

        setTarea("");
    };

    return (
        <div>
        <form className='todo-form' onSubmit={handleSubmit}>
            <input
             type='text' 
             value={tarea} 
             onChange={(element) => setTarea(element.target.value) }
             className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
             />
            <button
             type='submit'
             disabled={(tarea)?"":"disabled"}
             className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
             >Agregar</button>
        </form>
        </div>
    )
}

export default TodoForm;
