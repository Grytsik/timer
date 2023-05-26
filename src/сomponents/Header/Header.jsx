import { Navbar, Container } from 'react-bootstrap';
import timerImg from '../../img/chronometer.png';
import { observer } from 'mobx-react-lite';
import switchTheme from '../../store/switchTheme';
import { useEffect, useState } from 'react';
import './Header.scss';

const Header = observer(() => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const savedValue = localStorage.getItem('toggleState');
    if (savedValue) {
      setIsChecked(JSON.parse(savedValue));
    }
  }, []);

  const handleToggleChange = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    localStorage.setItem('toggleState',JSON.stringify(newValue));
    switchTheme.toggleTheme();
  };

  return (
    <Navbar
      className={`header ${switchTheme.theme}`}
      variant="gray"
    >
      <Container>
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={timerImg}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          React Timer
        </Navbar.Brand>
        <div>
          <input
            type="checkbox"
            id="toggle"
            checked={isChecked}
            onChange={handleToggleChange}
          />
          <label className="toggle" htmlFor="toggle" />
        </div>
      </Container>
    </Navbar>
  );
});

export default Header;
