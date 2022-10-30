import React, { useEffect, useState } from "react";
import CategoriesRow from './CategoriesRow';

let tableRowsData = [
    {
        Categorie: 'Drama',
        Books: ['Libro_1', 'Libro_2'],
    },
    {
        Categorie: 'Comedia',
        Books: ['Libro_1', 'Libro_2', 'Libro_3'],
    },

]
// LA PRIMERA VEZ ANDA, CUANDO REFRESCA DE NUEVO, YA NO

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
                                <th>Géneros</th>
                                <th>Total de libros</th>
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