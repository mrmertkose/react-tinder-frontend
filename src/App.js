import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.min.css';

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {ToastContainer} from "react-toastify";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import FooterNav from "./components/FooterNav";

function App() {
    return (
        <>
            <Router>
                <div className='container-fluid w-100 px-0'>
                    <Header/>
                    <Routes>
                        <Route path='/' element={<Dashboard/>}/>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/register' element={<Register/>}/>
                    </Routes>
                    <FooterNav/>
                </div>
            </Router>
            <ToastContainer/>
        </>
    );
}

export default App;
