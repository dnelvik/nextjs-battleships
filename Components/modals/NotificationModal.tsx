import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector } from '../../store/store';
import { getAlert } from '../../store/slices/gameStateSlice';
import { useRouter } from 'next/router';
require('react-bootstrap/ModalHeader');

const NotificationModal = () => {
  const router = useRouter();
  const [message, setMessage] = React.useState('');
  const [type, setType] = React.useState('');
  const [show, setShow] = React.useState(false);
  const alert = useSelector(getAlert);

  React.useMemo(() => {
    if (alert?.message) {
      setMessage(alert.message);
      setType(alert.type);
      setShow(true);
    }
  }, [alert]);

  const onClick = () => {
    setShow(false);
    router.push('/');
  };

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{type}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{message}</h4>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClick}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NotificationModal;
