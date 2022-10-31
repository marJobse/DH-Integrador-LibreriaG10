import React, { useEffect, useState } from "react";

function LastUserInDb() {

    const [ultimoId, setUltimoId] = useState('');

    useEffect(() => {
        fetch('http://localhost:3030/API/users/list')
            .then(res => res.json())
            .then(data => setUltimoId(data.meta.count))
            .catch(e => console.log(e))
    }, [])

    const [lastUser, setLastUsers] = useState('');

    useEffect(() => {
        fetch('http://localhost:3030/API/users/' + ultimoId)
            //  fetch('http://localhost:3030/API/users/4')
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
                        <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ width: 14 + 'rem' }} src={lastUser.imagen} alt="imágen del usuario" />
                        <p>ID: {lastUser.id}</p>
                        <p>Nombre: {lastUser.nombre}</p>
                        <p>Apellido: {lastUser.apellido}</p>
                        <p>Domicilio: {lastUser.domicilio}</p>
                        <p>Telefono: {lastUser.telefono}</p>
                        <p>Email: {lastUser.email}</p>
                    </div>

                    {/*<!-- Content Row Movies-->  <a className="btn btn-danger" target="_blank" rel="nofollow" href="/">View movie detail</a>*/}
                </div>
            </div>
        </div>
    )
}

export default LastUserInDb;
