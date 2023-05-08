import { Injectable } from '@angular/core';
import { RxStomp } from '@stomp/rx-stomp';
import { EafConfigurationService } from '@webkit/shared';

@Injectable({
  providedIn: 'root',
})
export class RxStompService extends RxStomp {
  constructor(private conf: EafConfigurationService) {
    super();
  }
  connect(authUser: string, nonce: string) {
    const configuration = this.conf.get('rxStompConfig');
    configuration.connectHeaders = {
      'x-auth-user': authUser,
      'x-nonce': nonce,
    };
    configuration.brokerURL = configuration.brokerURL + `?x-nonce=${nonce}&x-auth-user=${authUser}`;
    this.configure(configuration);

    // console.log('** WebSocket Config', configuration);
    this.activate();
  }
}
