import { FunctionComponent } from "react";
import Profile from "./Profile";
import { NavLink, useNavigate } from "react-router-dom";

interface NavBarProps {

}

const NavBar: FunctionComponent<NavBarProps> = () => {
    let navigate = useNavigate();
    return (<>
        <nav className="navbar navbar-expand-lg bg-dark">
            <NavLink className="navbar-brand text-light" to="/home">TechIt</NavLink>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                    <li className="nav-item ">
                        <NavLink className="nav-link text-light" to="/products">Products</NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink className="nav-link text-light" to="/cart">Cart</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link text-light" to="/profile">Profile</NavLink>
                    </li>
                </ul>
                <form className="d-flex" role="search">
                    <button className="btn btn-outline-primary" onClick={() => {
                        sessionStorage.removeItem("token");
                        // sessionStorage.removeItem("isLoggedIn");
                        // sessionStorage.removeItem("userEmail");
                        // sessionStorage.removeItem("isAdmin");
                        // sessionStorage.removeItem("userId");
                        navigate("/");
                    }}>
                        Log Out
                    </button>
                </form>

            </div>
        </nav>
    </>);
}

export default NavBar;

{/* <li className="nav-item dropdown">
    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Dropdown
    </a>
    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
        <a className="dropdown-item" href="#">Action</a>
        <a className="dropdown-item" href="#">Another action</a>
        <div className="dropdown-divider"></div>
        <a className="dropdown-item" href="#">Something else here</a>
    </div>
</li> */}