import DateTime from './сomponents/DateTime/DateTime';
import InputForm from './сomponents/InputForm/InputForm';
import Timer from './сomponents/Timer/Timer';
import './App.scss';

import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './сomponents/Header/Header';
import switchTheme from './store/switchTheme';
import { observer } from 'mobx-react-lite';

const App = observer(() => {
  return (
    <div className={`App ${switchTheme.theme}`}>
      <Header />
      <div className="container">
        <div className="timer__main">
          <InputForm />
          <DateTime />
        </div>
        <Timer />
      </div>
    </div>
  );
});

export default App;
