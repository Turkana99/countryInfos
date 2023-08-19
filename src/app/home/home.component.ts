import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { countriesLookUp } from '../countriesLookUp';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  myCountry: any;
  countryNames: any[] = [];
  countriesFilterValue = '';
  selectedCountry = '';
  timeout: any;
  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.populateCountryOptions();
    this.sendMessage('I love Turkana!');
    this.appService.getAnimalInfo('cheetah').subscribe((response) => {
      console.log(response);
    });
  }

  getCountryByName(countryName: string) {
    this.appService.getCountryByName(countryName).subscribe((response) => {
      this.myCountry = response[0];
      console.log(this.myCountry);
    });
  }

  filterCountries(event: any) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.countryNames = countriesLookUp.filter((countryName): any => {
        if (
          countryName?.name
            ?.toLocaleLowerCase()
            .includes(event.toLocaleLowerCase()) ||
          this.checkNativeNameIncludes(countryName, event)
        ) {
          return countryName;
        }
      });
    }, 500);
    // this.countryNames = countriesLookUp.filter((countryName): any => {
    //   if (
    //     countryName?.name
    //       ?.toLocaleLowerCase()
    //       .includes(event.toLocaleLowerCase()) ||
    //     this.checkNativeNameIncludes(countryName, event)
    //   ) {
    //     return countryName;
    //   }
    // });
  }

  populateCountryOptions() {
    this.countryNames = structuredClone(countriesLookUp);
  }

  checkNativeNameIncludes(obj: any, str: string) {
    if (obj?.nativeName) {
      return Object.values(obj?.nativeName).some(
        (x: any) =>
          x?.official?.toLocaleLowerCase().includes(str?.toLocaleLowerCase()) ||
          x?.common?.toLocaleLowerCase().includes(str?.toLocaleLowerCase())
      );
    } else {
      return false;
    }
  }

  getValuesOfObj(obj: any): any[] {
    if (obj) return Object.values(obj);
    else return [];
  }

  getCurrencies(obj: any) {
    let currencies: string[] = [];
    if (obj)
      Object.values(obj).forEach((x: any) => {
        currencies.push(x.name);
      });
    return currencies.join(', ');
  }

  sendMessage(message: string) {
    this.appService
      .sendMessage(message)
      .subscribe((resp) => console.log(resp.choices[0].message.content));
  }
}
