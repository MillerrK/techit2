import { FunctionComponent, useState } from "react";
import NavBar from "./NavBar";


interface ProfileProps {

}

const Profile: FunctionComponent<ProfileProps> = () => {

    return (<>

        <h1>Profile</h1>
        <div className="card" style={{ width: "18rem" }}>
            <div className="card-body">
                <h5 className="card-title">{sessionStorage.getItem("userName")}</h5>
                <h6 className="card-subtitle mb-2">{sessionStorage.getItem("userEmail")}</h6>
                <p className="card-text"></p>

                {sessionStorage.getItem("isAdmin") == "true" ? (<p>Hello, admin</p>) : (<p>Hello, body</p>)}
            </div>
        </div>
    </>);
}

export default Profile;

