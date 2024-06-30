import React, { useState, useReducer } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import listaReducer from "../reducers/listaReducer";

// Formato de elementos de mi lista de tareas
// {
//     done: false,  // Puede ser true o false, representa si la tarea esta hecha o no.
//     id: (+new Date()).toString(), // identificador de mi tarea
//     tarea // tarea >> tarea: {valor de la variable tarea}
// }


const TodoContainer = () => {

    // const [lista, setLista] = useState([])
    const [lista, dispatch] = useReducer(listaReducer, []);

    const handleAddTask = (objetoTarea) => { 
        // console.log("objeto", objetoTarea)
        // setLista([...lista, objetoTarea])
        dispatch({
            type: 'agregar',
            id: objetoTarea.id,
            tarea: objetoTarea.tarea
        })
    }

    const borrarTarea = (id) => {
        // setLista(lista.filter((item) => item.id !== id));
        dispatch({
            type: 'borrar',
            id
        })
    }

    const checkTarea = (objetoTarea) => {
        // setLista([...lista, objetoTarea]);
        console.log("checkeando", objetoTarea);
        dispatch({
            type: 'check',
            tarea: objetoTarea
        })
    }
    return (
        <div>
            TodoContainer
            <TodoForm handleAddTask={handleAddTask} />
            <TodoList lista={lista} borrarTarea={borrarTarea} checkTarea={checkTarea} />
        </div>
    )
}


export default TodoContainer;
