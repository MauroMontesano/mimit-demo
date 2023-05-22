import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseConverter, BaseHttpService, ConfigurationService } from '@engular/core-services';
import { UtenteConverter } from '../converters/utente.converter';
import { UtenteDto } from '../dtos/utente.dto';
import { Utente } from '../models/utente.model';

@Injectable({
  providedIn: 'root',
})
export class UtentiService extends BaseHttpService<Utente, UtenteDto> {
  constructor(protected conf: ConfigurationService, httpClient: HttpClient) {
    super(httpClient);
  }
  mock = true;

  protected utenteConverter = new UtenteConverter();
  getBaseResourceEndpoint(): string {
    return 'http://localhost:3000/utenti';
  }
  getConverter(): BaseConverter<Utente, UtenteDto> {
    return new UtenteConverter();
  }

  getServiceName(): string {
    return 'UtenteService';
  }
  // findUtenti(criteriaDto: any): Observable<SearchResult<Utente>> {
  // 	const url = 'http://localhost:3000/utenti';
  // 	const params = this.(criteriaDto);

  // 	return this.httpClient.post(url, criteriaDto, { params: params }).pipe(
  // 		map((response: SearchResult<UtenteDto>) => {
  // 			return this.utenteConverter.convertSearchResult(response);
  // 		}),
  // 	);
  // }
  // get(id: string): Observable<Utente> {
  // 	const url = this.conf.getApi('utenti.utenti', this.mock) + `/${id}`;
  // 	return this.httpClient
  // 		.get(url)
  // 		.pipe(map((response: UtenteDto) => this.utenteConverter.convertToModel(response)));
  // }
  // addUtente(utente: Utente): Observable<Utente> {
  // 	const url = this.conf.getApi('utenti.utenti', this.mock);
  // 	return this.httpClient
  // 		.post(url, this.utenteConverter.convertToDto(utente))
  // 		.pipe(map((response: UtenteDto) => this.utenteConverter.convertToModel(response)));
  // }
  // deleteUtente(utente: Utente): Observable<Utente> {
  // 	const url = this.conf.getApi('utenti.utenti', this.mock) + `/${utente.id}`;
  // 	return this.httpClient
  // 		.delete(url)
  // 		.pipe(map((response: UtenteDto) => this.utenteConverter.convertToModel(response)));
  // }
  // updateUtente(utente: Utente): Observable<Utente> {
  // 	const url = this.conf.getApi('utenti.utenti', this.mock) + `/${utente.id}`;
  // 	return this.httpClient
  // 		.put(url, this.utenteConverter.convertToDto(utente))
  // 		.pipe(map((response: UtenteDto) => this.utenteConverter.convertToModel(response)));
  // }
}
