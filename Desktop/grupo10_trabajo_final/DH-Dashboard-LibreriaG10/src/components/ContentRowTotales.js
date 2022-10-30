import React, { useEffect, useState } from "react";
import SmallCard from './SmallCard';


function ContentRowTotales() {
    const [books, setBooks] = useState('');
    const [users, setUsers] = useState('');
    const [genres, setGenres] = useState('');

    useEffect(() => {
        fetch('http://localhost:3030/API/books/')
            .then(res => res.json())
            .then(data => setBooks(data.meta.total))
            .catch(e => console.log(e))
    }, [])
    useEffect(() => {
        fetch('http://localhost:3030/API/users/list')
            .then(res => res.json())
            .then(data => setUsers(data.meta.count))
            .catch(e => console.log(e))
    }, [])
    useEffect(() => {
        fetch('http://localhost:3030/API/books/products')
            .then(res => res.json())
            .then(data => setGenres(data.data.booksByGenres))
            .catch(e => console.log(e))
    }, [])

    const resumen_totales = [{
        title: "Total de Libros",
        count: books,
        color: 'primary',
        icon: "fa-book"
    }, {
        title: "Total de Usuarios",
        count: users,
        color: 'success',
        icon: 'fa-user-check'
    }, {
        title: "Total de Géneros",
        count: genres.length,
        color: 'warning',
        icon: 'fa-star'
    }];

    return (
        <React.Fragment>

            <div className="row">

                {resumen_totales.map((item, i) => {

                    return <SmallCard {...item} key={i} />

                })}

            </div>
        </React.Fragment>
    )
}

export default ContentRowTotales;