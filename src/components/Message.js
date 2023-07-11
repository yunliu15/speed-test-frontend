import useMessage from '../hooks/useMessage';

const Message = () => {
    const {message} = useMessage();console.log(message)
    return ( 
        <p className={`message ${message.type}`}>{message.content}</p>
     );
}
 
export default Message;