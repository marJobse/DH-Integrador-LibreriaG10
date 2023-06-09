import React, { useEffect, useState } from "react";
import CategoriesRow from './CategoriesRow';

function CategoriesInDb() {

    const [genres, setGenres] = useState('');

    useEffect(() => {
        fetch('http://localhost:3030/api/books/products')
            .then(res => res.json())
            //   .then(data => setGenres(Object.values(data.data.booksByGenres)))
            .then(data => setGenres(data.data.booksByGenres))
            .catch(e => console.log(e))
    }, [])

    return (
        /* <!-- DataTales Example --> */
        <div className="card shadow mb-4">
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                            <tr>
                                <th><h5 className="m-0 font-weight-bold text-gray-800">Géneros</h5></th>
                                <th><h5 className="m-0 font-weight-bold text-gray-800">Total de libros</h5></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.values(genres).map((row, i) => {
                                    return <CategoriesRow {...row} key={i} />
                                })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}


export default CategoriesInDb;