import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  id: string | null | undefined;
  constructor(public router: Router, public route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.queryParams.subscribe(
      params => {
        this.id =  params['id'];
        console.log(params);
      }
    )
  }

  // @HostListener('window:scroll')
  onWindowScroll() {
    let element = document.querySelector('.my_navbar') as HTMLElement;
    console.log(element.clientHeight);
    if (window.pageYOffset > element.clientHeight) {
      element.classList.add('navbar-inverse');
    } else {
      element.classList.remove('navbar-inverse');
    }
  }
}
