import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa';
import {Link, useNavigate} from 'react-router-dom';
import {Button, Nav, Navbar} from "react-bootstrap";
import {useSelector, useDispatch} from "react-redux";
import {logout, reset} from "../features/auth/authSlice";
import { activityReset} from "../features/activity/activitySlice";

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth);


    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        dispatch(activityReset());
        navigate('/');
    }

    return (
        <Navbar bg="dark" variant="dark">
            <div className='container'>
                <Link className="navbar-brand" to='/'> KEKENDER</Link>
                <Navbar>
                    <Nav className="ml-auto text-white">
                        {
                            user ?
                                (
                                    <>
                                        <li className="nav-item">
                                            <Button className="btn-secondary" onClick={onLogout}> <FaSignOutAlt/> logout</Button>
                                        </li>
                                    </>
                                )
                                :
                                (
                                    <>
                                        <li className="nav-item mr-2">
                                            <Link to='/login'> <FaSignInAlt/> login</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to='/register'> <FaUser/> register</Link>
                                        </li>
                                    </>
                                )
                        }
                    </Nav>
                </Navbar>
            </div>
        </Navbar>
    );
}

export default Header;