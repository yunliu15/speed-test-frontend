import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";
import {Link, useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot, faBolt, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

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
                <div className="left"><FontAwesomeIcon icon={faRobot} /> Site Speed Test <FontAwesomeIcon icon={faBolt} /></div>
                <div className="right">{
                    auth.user? (
                        <>
                        <div>Welcome {auth.user}!</div>
                        <button onClick={handleLogout} className="as-link" > <FontAwesomeIcon icon={faArrowRightFromBracket} /> Log Out</button>
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
            </div>
            
        </header>
     )
}
 
export default Header;