import React, { useEffect, useState } from "react";

function LastUserInDb() {

    const [ultimoId, setUltimoId] = useState('');

    useEffect(() => {
        fetch('http://localhost:3030/API/users/list')
            .then(res => res.json())
            .then(data => setUltimoId(data.meta.count))
            .catch(e => console.log(e))
    }, [])

    console.log(ultimoId);


    const [lastUser, setLastUsers] = useState('');


    useEffect(() => {
        fetch('http://localhost:3030/API/users/' + ultimoId)
            .then(res => res.json())
            .then(data => setLastUsers(data.data))
            .catch(e => console.log(e))
    }, [])

    return (
        <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Ultimo usuario registrado</h5>
                </div>
                <div className="card-body">
                    <div className="text-center">
                        <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ width: 10 + 'rem' }} src={lastUser.imagen} alt="imágen del usuario" />
                    </div>
                    <p>ID: {lastUser.id}</p>
                    <p>Nombre: {lastUser.nombre}</p>
                    <p>Apellido: {lastUser.apellido}</p>
                    <p>Domicilio: {lastUser.domicilio}</p>
                    <p>Telefono: {lastUser.telefono}</p>
                    <p>Email: {lastUser.email}</p>

                    {/*<!-- Content Row Movies-->  <a className="btn btn-danger" target="_blank" rel="nofollow" href="/">View movie detail</a>*/}
                </div>
            </div>
        </div>
    )
}

export default LastUserInDb;
