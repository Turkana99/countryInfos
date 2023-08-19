import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private _token = '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';
  private dto = {
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: ``,
      },
    ],
  };

  constructor(private http: HttpClient) {}

  getCountryByName(countryName: string): Observable<any> {
    return this.http.get(`https://restcountries.com/v3.1/name/${countryName}`);
  }

  sendMessage(data: string): Observable<any> {
    this.dto.messages[0].content = data;
    return this.http.post(
      `https://api.openai.com/v1/chat/completions`,
      this.dto,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this._token}`,
        },
      }
    );
  }

  getAnimalInfo(animal: string): Observable<any> {
    return this.http.get(
      `https://api.api-ninjas.com/v1/animals?name=${animal}`,
      {
        headers: {
          'X-Api-Key': 'Plgupo7mxOhfSdN2Xp+GGg==tNx4PDSuExnzMvN6',
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
