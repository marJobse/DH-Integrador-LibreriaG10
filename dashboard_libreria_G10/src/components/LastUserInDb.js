import React, { useEffect, useState } from "react";

function LastUserInDb() {

    const [ultimoId, setUltimoId] = useState('');

    useEffect(() => {
        fetch('http://localhost:3030/API/users/list')
            .then(res => res.json())
            .then(data => setUltimoId(data.data[data.data.length-1]))
            .catch(e => console.log(e))
    }, [])

    const [lastUser, setLastUsers] = useState('');

    useEffect(() => {
       fetch('http://localhost:3030/API/users/' + ultimoId)
     //   fetch('http://localhost:3030/API/users/4')
            .then(res => res.json())
            .then(data => setLastUsers({ 'id': data.data.id, 'nombre': data.data.nombre, 'apellido': data.data.apellido, 'domicilio': data.data.domicilio, 'telefono': data.data.telefono, 'email': data.data.email, 'imagen': data.data.imagen }))
            .catch(e => console.log(e))
    }, [])
    console.log(lastUser)

    return (
        <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Último usuario registrado</h5>
                </div>
                <div className="card-body">
                    <div className="text-center">
                        
                        <p>ID: {ultimoId.id}</p>
                        <p>Nombre: {ultimoId.nombre}</p>
                        <p>Email: {ultimoId.email}</p>
                        <p><a href={ultimoId.detail}> Detalle del usuario  </a></p>
                    </div>

                    {/*<!-- Content Row Movies-->  <a className="btn btn-danger" target="_blank" rel="nofollow" href="/">View movie detail</a>*/}
                </div>
            </div>
        </div>
    )
}

export default LastUserInDb;
