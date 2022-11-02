import React from 'react';


function CategoriesRow(props) {
    return (
        <tr>
            <td>{props.nombre}</td>
            <td>
                {props.cantLibros}
            </td>
        </tr>
    )


}



export default CategoriesRow;