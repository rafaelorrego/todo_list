import React, { useState } from 'react'

const MenuItem = ({titulo, menuActivo, setMenuActivo}) => {
    return (
        <li><button style={menuActivo === titulo ? {backgroundColor: 'red'}:{}} onClick={() => setMenuActivo(titulo)}>{titulo}</button></li> 
    )
}


const Menu = (props) => {
    const { menuActivo, setMenuActivo } = props;
    return (
        <ul>
            <MenuItem titulo={"Home"} menuActivo={menuActivo} setMenuActivo={setMenuActivo} />
            <MenuItem titulo={"Productos"} menuActivo={menuActivo} setMenuActivo={setMenuActivo} />
            <MenuItem titulo={"Proveedores"} menuActivo={menuActivo} setMenuActivo={setMenuActivo} />
            <MenuItem titulo={"Contacto"} menuActivo={menuActivo} setMenuActivo={setMenuActivo} />
        </ul>
    )
}

export default Menu
