import {Outlet} from 'react-router-dom';
import Modal from './Modal';
import useModal from '../hooks/useModal'
const Layout = () => {
    const {showModal} = useModal()
    return ( 
        
        <div className='page-wrapper' >
            {showModal && <div class="overlay"></div>}
            <main className='App'>
                
                    <Modal />
                <Outlet />
                
            </main>
        </div>
     );
}
 
export default Layout;