export default function listaReducer(lista, accion) {
    if(accion.type === 'agregar'){
        return [
            ...lista,
            {
                done: false,
                id: accion.id,
                tarea: accion.tarea
            }
        ]
    } else if(accion.type === 'borrar'){
        return lista.filter((item) => item.id !== accion.id)
    } else if(accion.type === 'check') {
        return lista.map((tarea) => {
            if(tarea.id === accion.tarea.id){
                return accion.tarea
            } else {
                return tarea
            }
        } )
    }
}