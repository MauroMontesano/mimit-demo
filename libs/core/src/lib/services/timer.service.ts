import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  public timer: TimerInfo = new TimerInfo();
  public countdownString = '';
  public timerReady: Subject<number>;

  public startTimer(): void {
    this.timerReady = new Subject();
    this.clearInterval();
    this.timer.interval = setInterval(() => {
      const startTime = new Date().getTime();
      const endTime = this.timer.endTime.getTime();
      const distance = endTime - startTime;
      this.countdownString = this.transformMilisecondInString(distance);
      if (distance < 0) {
        this.clearInterval();
        this.timerReady.next(0);
        this.countdownString = '0';
      }
    }, 1000);
  }

  public clearInterval(): void {
    if (this.timer.interval) {
      clearInterval(this.timer.interval);
    }
    this.timer.interval = undefined;
  }

  private transformMilisecondInString(miliseconds: number): string {
    const days = Math.floor(miliseconds / (1000 * 60 * 60 * 24));
    const hours = Math.floor((miliseconds / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((miliseconds / (1000 * 60)) % 60);
    const seconds = Math.floor((miliseconds / 1000) % 60);

    const result = this.transform(days, hours, minutes, seconds);
    return result;
  }

  private transform(days: number, hours: number, minutes: number, seconds: number): string {
    let result = '';

    if (days > 0) {
      const dayLabel = days > 1 ? ' giorni ' : ' giorno ';
      const hourLabel = hours > 1 ? ' ore ' : ' ora ';
      result = days + dayLabel + hours + hourLabel;
    } else {
      const hourLabel = hours > 1 ? ' ore ' : ' ora ';
      const minuteLabel = minutes > 1 ? ' minuti ' : ' minuto ';
      const secondLabel = seconds > 1 ? ' secondi ' : ' secondo ';
      result = hours + hourLabel + minutes + minuteLabel + seconds + secondLabel;
    }
    setTimeout(() => {
      this.timerReady.next(1);
    }, 1000);
    return result;
  }

  getTimerStatus(): Observable<number> {
    return this.timerReady.asObservable();
  }
}

class TimerInfo {
  public endTime: Date;
  public interval: ReturnType<typeof setTimeout> | undefined;
}
