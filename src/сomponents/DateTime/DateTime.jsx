import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import Moment from 'react-moment';
import './DateTime.scss';
import { observer } from 'mobx-react-lite';
import switchTheme from '../../store/switchTheme';

const DateTime = observer(() => {
  const [localTime, setLocalTime] = useState(new Date());
  const [serverTime, setServerTime] = useState(null);
  const [isServerTimeAhead, setIsServerTimeAhead] = useState(false);

  useEffect(() => {
    const localInterval = setInterval(() => {
      setLocalTime(new Date());
    }, 1000);

    //Раз в 10 секунд обновляет время с сервера
    const serverInterval = setInterval(() => {
      fetchServerTime();
    }, 10000);

    return () => {
      clearInterval(localInterval);
      clearInterval(serverInterval);
    };
  }, []);

  //Сравнение правильности время из сервера
  useEffect(() => {
    if (serverTime && localTime) {
      setIsServerTimeAhead(serverTime >= localTime);
    }
  }, [serverTime, localTime]);

  const fetchServerTime = async () => {
    try {
      const response = await fetch(
        'http://worldtimeapi.org/api/timezone/Europe/Kyiv',
      );
      const data = await response.json();
      setServerTime(new Date(data.datetime));
    } catch (error) {
      console.error(
        'Ошибка при получении времени с сервера',
        error,
      );
    }
  };

  return (
    <Card className={`dateTime ${switchTheme.theme}`}>
      <Card.Header>
        <Moment format="DD MMMM YYYY">{localTime}</Moment>
      </Card.Header>
      <Card.Body>
        <Card.Title>Time now is</Card.Title>
        <Card.Text>
          {isServerTimeAhead
            ? serverTime.toLocaleTimeString()
            : localTime.toLocaleTimeString()}
        </Card.Text>
      </Card.Body>
    </Card>
  );
});

export default DateTime;
