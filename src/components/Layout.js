import {Outlet} from 'react-router-dom';
import Modal from './Modal';
import useModal from '../hooks/useModal';
import Header from './Header';

const Layout = () => {
    const {showModal} = useModal()
    return ( 
        <div className='page-wrapper' >
            <Header />
            {showModal && <div class="overlay"></div>}
            <main className='App'>
                
                    <Modal />
                <Outlet />
                
            </main>
        </div>
     );
}
 
export default Layout;