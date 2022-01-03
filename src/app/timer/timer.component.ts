import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  public timerValue: number = 55;
  public isStarted = false;
  public remainingTime = 0;

  private interval: number | undefined;

  constructor() {}

  ngOnInit(): void {}

  public getFormattedValue(valueInSeconds: number) {
    const hours = Math.floor(valueInSeconds / 60 / 60);
    const minutes = Math.floor(valueInSeconds / 60);
    const seconds = valueInSeconds % 60;

    return `${hours}h ${minutes}m` + (seconds ? ` ${seconds}s` : '');
  }

  public async startTimer() {
    await TimerComponent.requestPermission();
    this.isStarted = true;
    this.remainingTime = this.timerValue * 60;

    this.interval = setInterval(() => {
      if (this.remainingTime <= 0) {
        this.stopTimer();
        this.timesUp();
      } else {
        this.remainingTime--;
      }
    }, 1000);
  }

  public stopTimer() {
    clearInterval(this.interval);
    this.isStarted = false;
  }

  private timesUp() {
    TimerComponent.notifyUser('Time is up!!!');
  }

  private static notifyUser(message: string) {
    if (Notification.permission === 'granted') {
      new Notification(message);
    }
  }

  private static async requestPermission() {
    if (Notification.permission === "granted" || Notification.permission === "denied") {
      return;
    }

    await Notification.requestPermission();
  }

}
