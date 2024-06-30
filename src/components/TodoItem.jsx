import React, { useState, useEffect } from 'react'

const TodoItem = props => {

  const [imgUrl, setImgUrl] = useState('');

  useEffect(()=> {
    // codigo de lo que queremos que se ejecute: 
    // La llamada a una API externa para traer una imagen random
    const getImagen = async () => {
      const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=BHLENVE3VWZb7D1S9cpbmORAkiVCHg0HMjYBHzF2&count=1');
      const data = await response.json();
      // console.log(data[0]);
      /* data[0] = {
          date: "una fecha",
          ...
          url: "url de imagen"
       } */
      console.log("url de la imagen", data[0].url);
      // nombreDeLaFuncion(nuevoValorDelEstado)
      setImgUrl(data[0].url)
    }

    getImagen();
  }, []);

  const {
    onChange,
    data: { id, tarea, done },
  } = props;

  const completedStyle = {
    color: 'red',
    textDecorationLine: 'line-through'
  }
  return (
    <>
    <label className="todo new-item">
        {/* img con el valor de imgUrl */}
        <img src={imgUrl} style={{width: '40px'}}/>
        <input
         className="todo input"
         name={id}
         type="checkbox"
         defaultChecked={done}
         onChange={onChange}
         />
        <div style={done ? completedStyle : null}>{tarea}</div>

    </label>
</>

  )
}

export default TodoItem
