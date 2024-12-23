import { useNavigate } from 'react-router-dom';

import classes from './Modal.module.css';

function Modal ({children}) {
    const navigate = useNavigate();

    function closeHandler() {
        navigate('..'); // 이전 단계로 이동동
    }

    return(
        <>
            <div className={classes.backdrop} onClick={closeHandler}/>
            <dialog open className={classes.modal}>
                {children}
            </dialog>
        </>
    );
}

export default Modal;