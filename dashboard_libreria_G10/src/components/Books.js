import React from 'react';

function Books(props) {
    return (
        <React.Fragment>
            <div className="col-lg-6 mb-4">
                <div className="card text-white bg-dark  shadow">
                    <div className="libros card-body">
                        {props.nombre}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default Books;