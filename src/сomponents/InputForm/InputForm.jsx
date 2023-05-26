import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import './InputForm.scss';
import { Button, Alert } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import timerStore from '../../store/timerCount';
import switchTheme from '../../store/switchTheme';

const InputForm = observer(() => {
  const [inputValue, setValue] = useState(0);
  const [inputTtext, setText] = useState('');
  const [show, setShow] = useState(false);

  const handleSubmitTimer = (e) => {
    e.preventDefault();
    if (inputValue > 0 && inputTtext) {
      timerStore.addTimer(inputValue, inputTtext);
      setValue(0);
      setText('');
    } else {
      setShow(true);
    }
  };

  return (
    <div>
      <Form
        onSubmit={handleSubmitTimer}
        className={`inputForm ${switchTheme.theme}`}
      >
        <Form.Group
          className="mb-3"
          controlId="exampleForm.ControlInput1"
        >
          <Form.Label>Seconds</Form.Label>
          <Form.Control
            value={inputValue}
            onChange={(e) => {
              const value = e.target.value;
              value < 0 ? setValue(0) : setValue(value);
            }}
            type="number"
            placeholder="Seconds..."
          />
        </Form.Group>
        {show && (
          <Alert
            variant="danger"
            onClose={() => setShow()}
            dismissible
          >
            <Alert.Heading>
              Oh snap! You got an error!
            </Alert.Heading>
            <p>Seconds must be more zero!</p>
          </Alert>
        )}
        <Form.Group
          className="mb-3"
          controlId="exampleForm.ControlTextarea1"
        >
          <Form.Label>Text timer</Form.Label>
          <Form.Control
            value={inputTtext}
            onChange={(e) => setText(e.target.value)}
            as="textarea"
            rows={3}
            placeholder="Your text..."
            required
          />
        </Form.Group>
        <Button
          className="inputForm__btn"
          type="submit"
          variant="primary"
        >
          Go
        </Button>
      </Form>
    </div>
  );
});

export default InputForm;
