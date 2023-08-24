import { FunctionComponent, useEffect, useState } from "react";
import User from "../interfaces/User";
import { getUserDetails } from "../services/usersService";
import NavBar from "./NavBar";

interface Profile2Props {

}

const Profile2: FunctionComponent<Profile2Props> = () => {
    let [userInfo, setUserInfo] = useState<User>()
    useEffect(() => {
        getUserDetails()
            .then((res) => {
                if (res.data.length) {
                    setUserInfo(res.data[0]);
                }
            })
            .catch((err) => console.log(err));
    }, []);
    return (<>

        <div className="card">
            <div className="card-title">{userInfo?.name}</div>
            <div className="card-body">
                <div className="card-text">{userInfo?.email}</div>
                {userInfo?.isAdmin ? <p>This user is admin</p> : <p>Regular user</p>}
            </div>
        </div>
    </>);
}

export default Profile2;