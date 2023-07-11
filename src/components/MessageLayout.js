import {Outlet} from 'react-router-dom';
import { MessageProvider } from '../context/MessageProvider';

const MessageLayout = () => {
    return (
        <MessageProvider>
            <Outlet />
        </MessageProvider>
     );
}
 
export default MessageLayout;