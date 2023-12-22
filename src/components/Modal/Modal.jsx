import PropTypes from 'prop-types';
import styles from './Modal.module.css';

const Modal = ({ setIsOpen, content }) => {
  const handleClose = (e) => {
    if (e.target.classList.contains(styles.darkBG)) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <div className={styles.darkBG} onClick={handleClose} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>{content.title}</h5>
          </div>
          <div className={styles.modalContent}>{content.body}</div>
        </div>
      </div>
    </>
  );
};

Modal.propTypes = {
  setIsOpen: PropTypes.func.isRequired,
  content: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
};

export default Modal;
