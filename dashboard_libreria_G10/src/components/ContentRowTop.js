import React from 'react';
import ContentRowCenter from './ContentRowCenter';
import ContentRowTotales from './ContentRowTotales';
import CategoriesInDb from './CategoriesInDb';
import ProductsInDb from './ProductsInDb';

function ContentRowTop() {
	return (
		<React.Fragment>
			{/*<!-- Content Row Top -->*/}
			<div className="container-fluid">
				{/*<div className="d-sm-flex aligns-items-center justify-content-between mb-4">*/}
				<div className="card-header-app-dashboard py-3">
					<h1 className="h3 mb-0 text-gray-800">App Dashboard</h1>
				</div>

				{/*<!-- Content Row Movies-->*/}
				<ContentRowTotales />
				<ContentRowCenter />
				<ProductsInDb />
				<CategoriesInDb />

			</div>
			{/*<!--End Content Row Top-->*/}

		</React.Fragment>
	)

}
export default ContentRowTop;