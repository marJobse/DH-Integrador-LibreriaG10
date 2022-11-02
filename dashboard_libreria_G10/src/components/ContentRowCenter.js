import React from 'react';
import LastUserInDb from './LastUserInDb';

import LastBookInDb from './LastBookInDb';

function ContentRowCenter() {
    return (
        <div className="row">

            {/*<!-- Ültimo usuario cargado en la BD -->*/}

            {/*<!-- Lista de productos -->*/}

            <LastUserInDb />
            <LastBookInDb />

        </div>
    )
}

export default ContentRowCenter;