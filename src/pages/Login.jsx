import {useState, useEffect} from 'react';
import {FaSignInAlt} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {login, reset} from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const {email, password} = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth);

    useEffect(() => {
        if (isError) {
            if (typeof message === 'string'){
                toast.error(message);
            } else {
                Object.keys(message).map((value) => {
                    toast.error(message[value][0]);
                });
            }
        }

        if (isSuccess || user) {
            navigate('/');
        }
        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }

    const onSubmit = (e) => {
        e.preventDefault();

        let error = false;

        // if (!password) {
        //     error = true;
        //     toast.error('password cannot be blank');
        // }
        //
        // if (!email) {
        //     error = true;
        //     toast.error('email cannot be blank');
        // }

        if (!error) {
            const userData = {
                email, password
            }
            dispatch(login(userData));
        }

    }

    if (isLoading) {
        return <Spinner/>
    }

    return (
        <>
            <div className="container top-height">
                <div className="row">
                    <div className="col-lg-6 mx-auto">
                        <div className="card">

                            <div className="card-header text-center">
                                <FaSignInAlt/> LOGIN
                            </div>

                            <div className="card-body">
                                <div className="card-title text-center"><p>Login and discover new people</p></div>
                                <form onSubmit={onSubmit}>

                                    <div className="form-group">
                                        <label htmlFor="inputEmail">email</label>
                                        <input type="email" id="inputEmail" name="email" className="form-control"
                                               value={email} onChange={onChange} placeholder="enter your email"/>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="inputPassword">password</label>
                                        <input type="password" id="inputPassword" name="password"
                                               className="form-control" value={password} onChange={onChange}
                                               placeholder="enter password"/>
                                    </div>

                                    <button type="submit" className="btn btn-dark btn-block">login</button>
                                </form>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;