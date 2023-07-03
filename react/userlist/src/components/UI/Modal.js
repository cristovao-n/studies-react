import Button from './Button';

import styles from './Modal.module.css';

function Modal(props) {

   function clickHandler(e) {
      const targetClass = e.target.classList[1];
      if(targetClass === 'close-modal') {
         props.closeModal();

      }
   }

   return (
      <div
         onClick={clickHandler}
         className={`${styles['modal-overlay']} close-modal`}
      >
         <div className={styles.modal}>
            <h2>{props.title}</h2>
            <div className={styles.content}>
               <p>{props.message}</p>
               <div>
                  <Button className="close-modal">Okay</Button>
               </div>
            </div>
         </div>
      </div>

   );
}

export default Modal;