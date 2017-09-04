import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  private page = 'index';

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.router.events
      .filter(evt => evt instanceof NavigationEnd)
      .forEach((evt) => {
        this.page = this.route.root.firstChild.snapshot.data['page'] || 'index';
      });
  }

}
