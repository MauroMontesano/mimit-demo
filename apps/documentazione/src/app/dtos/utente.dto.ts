/*
 utente.nome = faker.name.firstName();
    utente.cognome = faker.name.lastName();
    utente.dataNascita = faker.date.past(20);
    utente.biografia = faker.lorem.paragraph();
    utente.email = faker.internet.email();
    utente.numero = faker.phone.phoneNumber();
    utente.numero1 = faker.phone.phoneNumberFormat(1);
    utente.numero2 = faker.phone.phoneNumberFormat(2);
    utente.numero3 = faker.phone.phoneNumberFormat(3);
    utente.citta = faker.address.city();
    utente.provincia = faker.address.county();
    utente.via = faker.address.streetName();
    utente.cap = faker.address.zipCode();
    utenti.push(utente);
*/
export class UtenteDto {
  id: number;
  nome: string;
  cognome: string;
  email: string | undefined;
  dataNascita: Date | undefined;
  biografia: string | undefined;
  numero: string | undefined;
  via: string | undefined;
  cap: number | undefined;
  citta: string | undefined;

  constructor(
    nome: string,
    cognome: string,
    email?: string,
    dataNascita?: Date,
    biografia?: string,
    numero?: string,
    via?: string,
    cap?: number,
    citta?: string,
    public progress?: number
  ) {
    this.id = Math.round(Math.random() * 10000);
    this.nome = nome;
    this.cognome = cognome;
    this.email = email;
    this.dataNascita = dataNascita;
    this.biografia = biografia;
    this.numero = numero;
    this.via = via;
    this.cap = cap;
    this.citta = citta;
  }
}
