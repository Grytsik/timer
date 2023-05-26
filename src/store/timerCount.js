import { makeAutoObservable } from 'mobx';

//Стор для таймера
class TimerCount {
  seconds = 0;
  inputText = '';
  showModal = false;

  constructor(seconds, inputText) {
    this.seconds = seconds;
    this.inputText = inputText;
    makeAutoObservable(this);
  }

  startTimer() {
    this.intervalId = setInterval(() => {
      this.incrementSeconds();
    }, 1000);
  }

  incrementSeconds() {
    this.seconds--;
    if (this.seconds <= 0) {
      this.showModal = true;
      this.stopTimer();
    }
  }

  stopTimer() {
    clearInterval(this.intervalId);
  }
}

class TimerStore {
  timers = [];

  constructor() {
    makeAutoObservable(this);
  }

  addTimer(seconds, inputText) {
    if (inputText && seconds > 0) {
      const timer = new TimerCount(seconds, inputText);
      timer.startTimer();
      this.timers.push(timer);
    }
  }

  removeTimer(timer) {
    this.timers = this.timers.filter((t) => t !== timer);
  }
}

const timerStore = new TimerStore();
export default timerStore;
