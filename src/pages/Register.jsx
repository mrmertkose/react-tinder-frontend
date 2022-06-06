import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from 'react-router-dom';
import {toast} from "react-toastify";
import {FaUser} from "react-icons/fa";
import {register, reset} from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const {name, email, password} = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth);

    useEffect(() => {
        if (isError) {
            Object.keys(message).map((value) => {
                toast.error(message[value][0]);
            });
        }
        if (isSuccess || user) {
            navigate('/');
        }
        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }

    const onSubmit = (e) => {
        e.preventDefault();

        let error = false;

        if (!password) {
            error = true;
            toast.error('password cannot be blank');
        }

        if (!name) {
            error = true;
            toast.error('name cannot be blank');
        }

        if (!email) {
            error = true;
            toast.error('email cannot be blank');
        }

        if (!error) {
            const userData = {
                name, email, password
            }

            dispatch(register(userData));
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
                                <FaUser/> REGISTER
                            </div>

                            <div className="card-body">
                                <div className="card-title text-center"><p>Please create an account</p></div>
                                <form onSubmit={onSubmit}>

                                    <div className="form-group">
                                        <label htmlFor="inputName">name</label>
                                        <input type="text" id="inputName" name="name" className="form-control"
                                               value={name} onChange={onChange} placeholder="enter your name"/>
                                    </div>

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

                                    <button type="submit" className="btn btn-dark btn-block">register</button>
                                </form>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;