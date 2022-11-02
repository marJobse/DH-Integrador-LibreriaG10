import React from 'react';
import image from '../assets/images/logo_g10.png';
import { NavLink, Route, Switch } from 'react-router-dom';
import ContentWrapper from './ContentWrapper';
import ProductsInDb from './ProductsInDb';
import CategoriesInDb from './CategoriesInDb';
import LastBookInDb from './LastBookInDb';
import LastUserInDb from './LastUserInDb';
import NotFound from './404';




function SideBar() {
    return (
        <React.Fragment>
            {/*<!-- Sidebar -->*/}
            <ul className="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion" id="accordionSidebar">

                {/*<!-- Sidebar - Brand -->*/}
                <NavLink className="sidebar-brand d-flex align-items-center justify-content-center" exact to="/">
                    <div className="sidebar-brand-icon">
                        <img className="w-100" src={image} alt="Logo G10" />
                    </div>
                </NavLink>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider my-0" />

                {/*<!-- Nav Item - Dashboard -->*/}
                <li className="nav-item active">
                    <NavLink className="nav-link" to="/">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard - Libreria G10</span></NavLink>
                </li>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider" />

                {/*<!-- Heading -->*/}
                <div className="sidebar-heading">Información útil</div>
                {/*<!-- Nav Item - Pages -->*/}
                <li className="nav-item">
                    <NavLink className="nav-link collapsed" to="/products">
                        <i className="fas fa-fw fa-folder"></i>
                        <span>Libros</span>
                    </NavLink>
                </li>

                {/*<!-- Nav Item - Pages -->*/}
                <li className="nav-item">
                    <NavLink className="nav-link collapsed" to="/user">
                        <i class="fas fa-regular fa-user-plus"></i>
                        <span>Último usuario registrado</span>
                    </NavLink>
                </li>

                {/*<!-- Nav Item - Pages -->*/}
                <li className="nav-item">
                    <NavLink className="nav-link collapsed" to="/book">
                        <i class="fas fa-book"></i>
                        <span>Último libro ingresado</span>
                    </NavLink>
                </li>

                {/*<!-- Nav Item - Tables -->*/}
                <li className="nav-item">
                    <NavLink className="nav-link" to="/categories">
                        <i className="fas fa-fw fa-table"></i>
                        <span>Géneros de libros</span></NavLink>
                </li>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider d-none d-md-block" />
            </ul>
            {/*<!-- End of Sidebar -->*/}

            <Switch>
                <Route path="/" exact component={ContentWrapper} />
                <Route path="/products" component={ProductsInDb} />
                <Route path="/user" component={LastUserInDb} />
                <Route path="/book" component={LastBookInDb} />
                <Route path="/categories" component={CategoriesInDb} />
                {/* <Route path="/" exact component={ContentWrapper} />*/}
                <Route path="/*" component={NotFound} />


            </Switch>


        </React.Fragment >
    )
}
export default SideBar;