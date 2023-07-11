import {Outlet} from 'react-router-dom';
import { MessageProvider } from '../context/MessageProvider';
import Message from './Message';

const MessageLayout = () => {
    return (
        <MessageProvider>
            <Message />
            <Outlet />
        </MessageProvider>
     );
}
 
export default MessageLayout;