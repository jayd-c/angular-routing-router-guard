import { Component, OnInit, inject } from '@angular/core';
import { BannerComponent } from './banner/banner.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { PopularComponent } from './popular/popular.component';
import { ServicesComponent } from './services/services.component';
import { TestimonyComponent } from './testimony/testimony.component';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BannerComponent, 
            ContactUsComponent,
            PopularComponent,
            ServicesComponent,
            TestimonyComponent,
            CurrencyPipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  activeRoute:ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.activeRoute.fragment.subscribe((data) => {
      console.log(data)
      this.jumpToSection(data);
    })
  }
  jumpToSection(section) {
    document.getElementById(section).scrollIntoView({behavior: 'smooth'});
  }
}
