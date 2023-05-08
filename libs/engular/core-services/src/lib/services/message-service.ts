import { Message, MessageType } from '@engular/base-models';
import { Observable, Subject } from 'rxjs';

//                                   .-=":-=")
//                                   |_.'|_.'
//                                  /" /"  :
//                                 /  /   /
//                               .' .'    :
//                            .-'-.---.  /
//                         .--"""""--.. :
//                       .((((__      .\
//                  ___.:-//\\\\\\-._  -.
//         __..--'"`     [.]-[.] \\_. `  `""--..__
//    ..---\           ___(/_    | /___           /---..
//   """",-/_...---'"``    \,_  /.-    ``"'---..__\-,""""
//      "              /"""'"'""""/                  "
//                     \`'-.__.-' \___    aa/wkm
//                      "._________".'
//
/**
 * This service manage all message broadcast in the system. It's based on Subject Observable.
 */
export class MessageService {
  private bus: Subject<Message>;

  constructor() {
    // log.info('Message service started');
    // Observable sources
    this.bus = new Subject<Message>();
  }

  /**
   * Subscribe a function to receive all new messages
   * @param callMeOnNewMessage
   */
  public subscribe() {
    // log.debug('add new subscriber', callMeOnNewMessage);
    return this.bus.asObservable();
  }

  /**
   * Return a observable
   */
  public getObserver(): Observable<Message> {
    // log.debug('someone register with a observable');
    return this.bus.asObservable();
  }

  /**
   * Throw a message to observer and check as managed the message
   * @param m
   */
  public throwMessage(m: Message) {
    if (m instanceof Message === false) {
      this.manageJSError(m);
      return;
    }
    // log.debug('throw a message', m);
    m.managed();
    this.bus.next(m);
  }

  /**
   * Throw an unmanaged message to the observer (for developers only)
   * @param m
   */
  public throwUnmanagedMessage(m: Message) {
    // log.debug('throw developer message', m);
    this.bus.next(m);
  }

  /**
   * This method simplify send message
   * @param text the content of message
   * @param title the title of message
   * @param type the type of messages
   */
  public throwMessageSimple(text: string, type: MessageType = MessageType.INFO, i18nPlaceHolder?: any, title?: string) {
    // log.debug('throw message simple', text, title, type);
    const mex: Message = new Message(text, title, type, i18nPlaceHolder);
    // mex.message = text;
    // mex.title = title;
    // mex.type = type;
    // mex.i18NPlaceHolder = i18nPlaceHolder;
    mex.managed();
    this.bus.next(mex);
  }

  /**
   * this method manage the case you sent a js error to this service for error
   */
  private manageJSError(err: any) {
    this.throwMessageSimple(err.message, MessageType.ERROR_BLOCK, undefined, 'ERRORE IMPREVISTO');
  }
}
