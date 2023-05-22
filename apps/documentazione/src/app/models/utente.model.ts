/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { BaseModel, DateModel } from '@engular/base-models';

export class Utente extends BaseModel {
  private _nome: string;
  private _cognome: string;
  private _email: string | undefined;
  private _dataNascita: DateModel | undefined;
  private _biografia: string | undefined;
  private _numero: string | undefined;
  private _via: string | undefined;
  private _cap: number | undefined;
  private _citta: string | undefined;

  constructor(
    nome: string,
    cognome: string,
    email: string,
    dataNascita?: DateModel,
    biografia?: string,
    numero?: string,
    via?: string,
    cap?: number,
    citta?: string,
    id?: number,
    public progress?: any
  ) {
    super(nome + cognome);
    this._nome = nome;
    this._cognome = cognome;
    this._email = email;
    this._dataNascita = dataNascita;
    this._biografia = biografia;
    this._numero = numero;
    this._via = via;
    this._cap = cap;
    this._citta = citta;
    this.id = id;
  }

  override set id(id: number | undefined) {
    this._id = id;
  }

  override get id() {
    return this._id;
  }

  /**
   * Getter nome
   * @return
   */
  public get nome(): string {
    return this._nome;
  }

  /**
   * Getter cognome
   * @return
   */
  public get cognome(): string {
    return this._cognome;
  }

  /**
   * Getter email
   * @return
   */
  public get email(): string {
    return this._email as string;
  }

  /**
   * Getter dataNascita
   * @return
   */
  public get dataNascita(): DateModel {
    return this._dataNascita as DateModel;
  }

  /**
   * Getter biografia
   * @return
   */
  public get biografia(): string {
    return this._biografia as string;
  }

  /**
   * Getter numero
   * @return
   */
  public get numero(): string {
    return this._numero as string;
  }

  /**
   * Getter via
   * @return
   */
  public get via(): string {
    return this._via as string;
  }

  /**
   * Getter cap
   * @return
   */
  public get cap(): number {
    return this._cap as number;
  }

  /**
   * Getter citta
   * @return
   */
  public get citta(): string {
    return this._citta as string;
  }

  /**
   * Setter nome
   * @param value
   */
  public set nome(value: string) {
    this._nome = value;
  }

  /**
   * Setter cognome
   * @param value
   */
  public set cognome(value: string) {
    this._cognome = value;
  }

  /**
   * Setter email
   * @param value
   */
  public set email(value: string) {
    this._email = value;
  }

  /**
   * Setter dataNascita
   * @param value
   */
  public set dataNascita(value: DateModel) {
    this._dataNascita = value;
  }

  /**
   * Setter biografia
   * @param value
   */
  public set biografia(value: string) {
    this._biografia = value;
  }

  /**
   * Setter numero
   * @param value
   */
  public set numero(value: string) {
    this._numero = value;
  }

  /**
   * Setter via
   * @param value
   */
  public set via(value: string) {
    this._via = value;
  }

  /**
   * Setter cap
   * @param  value
   */
  public set cap(value: number) {
    this._cap = value;
  }

  /**
   * Setter citta
   * @param value
   */
  public set citta(value: string) {
    this._citta = value;
  }
}
