import {useSelector} from "react-redux";
import {FaInbox, FaSearchengin, FaUser} from "react-icons/fa";
import {Link} from "react-router-dom";


function FooterNav() {

    const {user} = useSelector((state) => state.auth);

    const footerNav = user ? (<>

        <div className="footer navbar-dark bg-dark">
            <div className="d-flex justify-content-around py-3 text-center text-white">
                <div className="my-auto">
                    <Link to='profile'>
                        <FaUser className="footer-font-size"/>
                    </Link>
                </div>

                <div className="my-auto">
                    <Link to='/'>
                        <FaSearchengin className="footer-font-size"/>
                        <p>discover</p>
                    </Link>
                </div>

                <div className="my-auto">
                    <Link to='inbox'>
                        <FaInbox className="footer-font-size"/>
                    </Link>
                </div>
            </div>
        </div>
    </>) : null;

    return (
        <>
            {footerNav}
        </>
    );
}

export default FooterNav;