import { useContext } from "react";
import Deshbord from "../components/Deshbord";
import { UserContext } from "../state/stateprovider";
import Login from '../components/Login'
import Notify from "../components/subcomponent/Notify";

const index = () => {
    const ctx = useContext(UserContext)
    return (
        <div className="container">
            {ctx.user ? <Deshbord /> : <Login />} 
            <Notify ststus={ctx.red} notify={ctx.notice &&ctx.notice}/>
        </div>
    );
};

export default index;