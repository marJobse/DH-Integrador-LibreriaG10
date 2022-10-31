import React from 'react';

import ProductsList from './ProductsInDb';
import LastUserInDb from './LastUserInDb';

function ContentRowCenter() {
    return (
        <div className="row">

            {/*<!-- Ültimo usuario cargado en la BD -->*/}
            <LastUserInDb />
            {/*<!-- Lista de productos -->*/}
            <ProductsList />

        </div>
    )
}

export default ContentRowCenter;