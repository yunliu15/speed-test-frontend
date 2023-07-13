import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";
import {Link, useNavigate} from "react-router-dom";

const Header = () => {
    const { auth } = useAuth();
    const logout = useLogout();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    }
    return ( 
        <header>
            <div className="header-container">
            {
                auth.user? (
                    <>
                    <div>Welcome {auth.user}!</div>
                    <button onClick={handleLogout} className="as-link" >Log Out</button>
                    </>
                ) : (
                    <>
                    <Link to='/login'>Login In</Link> 
                    <span>or</span> 
                    <Link to='/register'>Register</Link>
                    </>
                 )
            }
            </div>
            
        </header>
     )
}
 
export default Header;