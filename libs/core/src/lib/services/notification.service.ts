import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { RxStompService } from './rx-stomp.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private websocketSubscription: { [key: string]: Subscription } = {};
  private notificationSubject: Subject<any>;
  private reducers: ((message: any) => any)[] = [];

  constructor(private websocket: RxStompService) {
    this.notificationSubject = new Subject();
  }

  watch(channel: string, topic: string) {
    if (this.websocketSubscription && Object.keys(this.websocketSubscription).includes(channel + topic)) {
      return;
    }
    this.websocketSubscription[channel + topic] = this.websocket.watch(channel + topic).subscribe((message) => {
      let messageReduced = message;
      this.reducers.forEach((r) => {
        messageReduced = r({ channel: channel, topic: topic, payload: messageReduced });
      });
      this.notificationSubject.next({ channel: channel, topic: topic, payload: messageReduced });
    });
  }

  unWatch(channel: string, topic: string) {
    const sub = this.websocketSubscription[channel + topic];
    if (sub && !sub.closed) {
      sub.unsubscribe();
    }
  }

  addReducer(reducer: (message: any) => any) {
    this.reducers.push(reducer);
  }

  getNotification(): Observable<any> {
    return this.notificationSubject.asObservable();
  }
}
