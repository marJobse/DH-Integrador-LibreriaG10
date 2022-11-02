import React, { useEffect, useState } from "react";


function LastBookInDb() {

    const [lastBook, setLastBook] = useState('');

    useEffect(() => {
        fetch('http://localhost:3030/api/books/')
            .then(res => res.json())
            .then(data => setLastBook(data.data[data.data.length - 1]))
            .catch(e => console.log(e))
    }, [])

    return (
        <div className="libros-en-db">
            <div className=" col-lg-6 mb-4">
                <div className=" card shadow mb-4">
                    <div className="card-header py-3">
                        <h5 className="m-0 font-weight-bold titulos-en-blanco">Ultimo libro ingresado a la BD</h5>
                    </div>
                    <div className="  card-body">
                        <div className="text-center">
                            <p>ID: {lastBook.id}</p>
                            <p>Nombre: {lastBook.nombre}</p>
                            <p>Precio: ${lastBook.precio}</p>
                            <p>Año de edición: {lastBook.anio_edicion}</p>
                            <p>Stock: {lastBook.stock}</p>
                            {/*<!-- Content Row Movies-->  <a className="btn btn-danger" target="_blank" rel="nofollow" href="/">View movie detail</a>*/}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LastBookInDb;
