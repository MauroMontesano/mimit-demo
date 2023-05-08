import { MessageType } from '../../constants/message-type.conts';

//       ________________
//     /`.          _,-'/
//    /   `.    _,-'   /
//   /   ,-'`.-'.     /
//  /_,-'        `.  /
// /'______________`/

/**
 * Describe a Generic Message
 */
export class Message {
  /**
   * The message type
   */
  private _type: MessageType = MessageType.INFO;

  /**
   *  Unique message/error code
   */
  private _code: number;

  /**
   * Message description
   */
  private _message: string;

  /**
   * Message title
   */
  private _title: string | undefined;

  /**
   * Values for i18n placeholder
   */
  private _i18NPlaceHolder: any = {};

  /**
   * The API's endpoint from witch message has arrived
   */
  private _url: string;

  /**
   * Describe if the message has already managed
   */
  private _managed: boolean = false;

  constructor(text: string, title?: string, type: MessageType = MessageType.INFO, i18nPlaceHolder?: any) {
    this.message = text;
    this.title = title;
    this.type = type;
    this.i18NPlaceHolder = i18nPlaceHolder;
  }

  public static buildMessageSimple(
    text: string,
    type: MessageType = MessageType.INFO,
    i18nPlaceHolder?: any,
    title?: string
  ) {
    const mex: Message = new Message(text, title, type, i18nPlaceHolder);
    // mex.message = text;
    // mex.title = title;
    // mex.type = type;
    // mex.i18NPlaceHolder = i18nPlaceHolder;
    return mex;
  }

  /**
   * Check the message as managed
   */
  managed() {
    this._managed = true;
  }

  /**
   * Get information on managed status of message
   */
  isManaged(): boolean {
    return this._managed;
  }

  /**
   * Getter type
   *
   */
  public get type(): MessageType {
    return this._type;
  }

  /**
   * Getter code
   *
   */
  public get code(): number {
    return this._code;
  }

  /**
   * Getter message
   *
   */
  public get message(): string {
    return this._message;
  }

  /**
   * Getter url
   *
   */
  public get url(): string {
    return this._url;
  }

  /**
   * Setter type
   *
   */
  public set type(value: MessageType) {
    this._type = value;
  }

  /**
   * Setter code
   *
   */
  public set code(value: number) {
    this._code = value;
  }

  /**
   * Setter message
   *
   */
  public set message(value: string) {
    this._message = value;
  }

  /**
   * Setter url
   *
   */
  public set url(value: string) {
    this._url = value;
  }

  /**
   * Getter title
   *
   */
  public get title(): string | undefined {
    return this._title;
  }

  /**
   * Setter title
   *
   */
  public set title(value: string | undefined) {
    this._title = value;
  }

  /**
   * Getter i18NPlaceHolder
   *
   */
  public get i18NPlaceHolder(): any {
    return this._i18NPlaceHolder;
  }

  /**
   * Setter i18NPlaceHolder
   *
   */
  public set i18NPlaceHolder(value: any) {
    this._i18NPlaceHolder = value;
  }
}
