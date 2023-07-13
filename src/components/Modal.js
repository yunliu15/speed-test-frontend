import useModal from "../hooks/useModal";


const Modal = () => {
    const {showModal, setShowModal, modalContent, modalCallback} = useModal();
    return ( 
        <>
        {
            showModal &&  (
            <dialog open>
                <div className="content">{modalContent}</div>
                <div className="actions">
                    <button className="primary" onClick={() => {modalCallback(); setShowModal(false)}}>Confirm</button>
                    <button className="secondary" onClick={() => setShowModal(false)}>Cancel</button>
                </div>
            </dialog>
            )
        }
        </>
     );
}
 
export default Modal;