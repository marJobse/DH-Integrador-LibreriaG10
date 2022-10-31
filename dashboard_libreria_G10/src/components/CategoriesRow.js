import React from 'react';


function CategoriesRow(props) {
    return (
        <tr>
            <td>{props.nombre}</td>
            <td>
                <ul>
                    {props.cantLibros}
                </ul>
            </td>
        </tr>
    )


}



export default CategoriesRow;