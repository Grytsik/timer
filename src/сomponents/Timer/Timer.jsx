import { observer } from 'mobx-react-lite';
import timerStore from '../../store/timerCount';
import { Modal, Button, Card } from 'react-bootstrap';
import './Timer.scss';
import switchTheme from '../../store/switchTheme';

const Timer = observer(() => {
  const handleShowModal = (timer) => {
    timer.showModal = false;
    timerStore.removeTimer(timer);
  };

	//Функция перевода из секунд в минуты и секунды
  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time - minutes * 60);

    if (minutes < -10) minutes = '0' + minutes;
    if (seconds < -10) seconds = '0' + seconds;
    return minutes + ':' + seconds;
  };

  return (
    <div className="timer">
      {timerStore.timers.map((item, index) => (
        <div key={index}>
          <Card className={`timer__item ${switchTheme.theme}`}>
            <Card.Header>Timer</Card.Header>
            <Card.Body>
              <Card.Text>
                {formatTime(item.seconds)}
              </Card.Text>
            </Card.Body>
          </Card>
          {item.showModal && (
            <Modal
							className='modal'
              show={item.showModal}
              onHide={() => handleShowModal(item)}
            >
              <Modal.Header closeButton>
              </Modal.Header>
							<Modal.Title>Timer message:</Modal.Title>
              <Modal.Body>{item.inputText}</Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => handleShowModal(item)}
                >
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          )}
        </div>
      ))}
    </div>
  );
});

export default Timer;

