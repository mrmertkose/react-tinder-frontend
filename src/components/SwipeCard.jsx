import TinderCard from "react-tinder-card";
import {useDispatch, useSelector} from "react-redux";
import {findUser, userActivity, activityReset} from "../features/activity/activitySlice";
import Spinner from "../components/Spinner";
import {useEffect} from 'react';
import {toast} from "react-toastify";
import {FaHeart, FaTimes, FaUndoAlt} from "react-icons/fa";
import MatchUserPopup from "./MatchUserPopup";

function SwipeCard() {

    const dispatch = useDispatch();
    const {activity, isLoading, isError, message} = useSelector((state) => state.activity);

    const swiped = (direction, userId) => {
        const formData = {
            direction, userId
        }
        dispatch(userActivity(formData));
        dispatch(activityReset());
        dispatch(findUser());
    }

    useEffect(() => {

        if (isError) {
            toast.error(message);
        }

        dispatch(findUser());

        // return () => {
        //     dispatch(activityReset());
        // }

    }, [isError, message, dispatch]);

    if (isLoading) {
        return <Spinner/>
    }


    return (
        <>
            {
                activity ?
                    (
                        <>
                            <TinderCard className="swipe card custom-z-index" key={activity.id}
                                        onSwipe={(dir) => swiped(dir, activity.id)}>
                                <img className="card-img-top" src={activity.photos[0].image} alt={activity.name}/>
                                <div className="card-img-overlay h-100 d-flex flex-column justify-content-end">
                                    <h4 className="card-title text-center"><span
                                        className="custom-card-title-bg">{activity.name} - {activity.age} - {activity.gender}</span>
                                    </h4>
                                </div>
                            </TinderCard>

                            <div className='d-flex justify-content-center mt-4'>
                                <button className="btn btn-warning btn-circle btn-xl mr-4"
                                        onClick={() => swiped('left', activity.id)}><FaTimes/>
                                </button>
                                <button className="btn btn-secondary btn-circle btn-xl mr-4"
                                        onClick={() => swiped('back', activity.id)}><FaUndoAlt/>
                                </button>
                                <button className="btn btn-danger btn-circle btn-xl"
                                        onClick={() => swiped('right', activity.id)}><FaHeart/>
                                </button>
                            </div>

                            <MatchUserPopup/>
                        </>
                    )
                    :
                    (
                        <>
                            <div className="card custom-z-index">
                                <div className="card-body">
                                    <div className="alert alert-danger my-auto text-center">
                                        No other users found. Change your preferences.
                                    </div>
                                </div>
                            </div>
                        </>
                    )
            }
        </>
    );
}

export default SwipeCard;