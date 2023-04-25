import React, { useEffect, useState } from "react";

function LastUserInDb() {

    const [lastUser, setLastUsers] = useState('');

    useEffect(() => {
        fetch('http://localhost:3030/API/users/list')
            .then(res => res.json())
            .then(data => setLastUsers(data.data[data.data.length - 1]))
            .catch(e => console.log(e))
    }, [])

    return (

        <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold titulos-en-blanco">Ultimo usuario registrado</h5>
                </div>
                <div className="card-body">
                    <div className="text-center">
                        <p>ID: {lastUser.id}</p>
                        <p>Nombre: {lastUser.nombre}</p>
                        <p>Email: {lastUser.email}</p>

                        {/*<!-- Content Row Movies-->  <a className="btn btn-danger" target="_blank" rel="nofollow" href="/">View movie detail</a>*/}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LastUserInDb;
