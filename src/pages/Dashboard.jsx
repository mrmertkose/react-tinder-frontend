import {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import SwipeCard from "../components/SwipeCard";


function Dashboard() {

    const navigate = useNavigate();

    const {user} = useSelector((state) => state.auth);

    useEffect(() => {
        if (!user){
            navigate('login');
        }
    },[user,navigate]);


    return (
        <div className="container top-height">
            <div className="row">
                <div className="col-lg-6 mx-auto mb-5">
                        <SwipeCard />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;