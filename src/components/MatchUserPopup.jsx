import {useDispatch, useSelector} from "react-redux";
import {FaCheck, FaTimes} from "react-icons/fa";
import {Link} from "react-router-dom";
import {activityReset, findUser} from "../features/activity/activitySlice";

function MatchUserPopup() {

    const {match} = useSelector((state) => state.activity);
    const dispatch = useDispatch();

    function closeNav() {
        document.getElementById("myNav").style.width = "0%";
        dispatch(activityReset());
        dispatch(findUser());
    }

    return (  <>
        {
            match ? (<>
                <div id="myNav" style={{width: "100%"}} className="overlay">

                    <button className="btn btn-warning closebtn" onClick={closeNav}><FaTimes /></button>

                    <div className="overlay-content text-white ">
                        <h2 className="font-weight-bold">ITS MATCH !!!</h2>
                    <img src={match.photos[0].image} className="rounded-circle" width="250" alt={match.name}/>
                        <p className="mt-3">{match.name} let's start talking</p>
                        <Link to='inbox'>
                            <button className="btn btn-success" onClick={closeNav}><FaCheck/></button>
                        </Link>
                    </div>

                </div></>) : (<></>)
        }
    </>);
}

export default MatchUserPopup;