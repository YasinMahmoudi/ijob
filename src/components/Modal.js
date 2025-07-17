import useKey from '../hooks/useKey';
import Button from './Button';
import { TiTimes } from 'react-icons/ti';

export default function Modal({ children, onCloseModal, count }) {
  useKey('Escape', function () {
    onCloseModal(false);
  });

  function handleCloseModal() {
    onCloseModal(false);
  }

  return (
    <>
      <div className="modal">
        <div className="modal-header">
          <Button className="modal-close" onClick={handleCloseModal}>
            <TiTimes />
          </Button>

          <strong className="modal-title">
            Your Bookmarks
            <span> ( {count} ) </span>
          </strong>
        </div>

        <div className="modal-content">{children}</div>
      </div>

      <div className="overlay" onClick={handleCloseModal}></div>
    </>
  );
}
