import React from 'react';
import LastUserInDb from './LastUserInDb';

import LastBookInDb from './LastBookInDb';

function ContentRowCenter() {
    return (
        <div className="  row">

            {/*<!-- Ültimo usuario cargado en la BD -->*/}
            <LastUserInDb />
            {/*<!-- Ültimo libro cargado en la BD -->*/}
            <LastBookInDb />

        </div>
    )
}

export default ContentRowCenter;