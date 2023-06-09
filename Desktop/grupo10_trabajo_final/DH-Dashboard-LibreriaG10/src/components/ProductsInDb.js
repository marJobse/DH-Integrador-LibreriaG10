import React, { useEffect, useState } from "react";
import Books from './Books';


function ProductsInDb() {

  const [productsList, setProductList] = useState('');

  useEffect(() => {
    fetch('http://localhost:3030/api/books/')
      .then(res => res.json())
      .then(data => setProductList(data.data))
      .catch(e => console.log(e))
  }, [])

  console.log(productsList)


  return (
    <React.Fragment>
      <div className="col-lg-6 mb-4">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6>Libros en la BD</h6>
          </div>
          <div className="card-body card2">
            <div className="row">
              {
                Object.values(productsList).map((product, index) => {
                  return <Books  {...product} key={index} />
                })
              }
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ProductsInDb;
