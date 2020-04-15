import { Component, OnInit } from '@angular/core';
import { AppSessionService } from 'src/app/services/appSession.service';
import { environment } from 'src/environments/environmentnokeys';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent implements OnInit {

  constructor(public appSessionService: AppSessionService) { }

  ngOnInit() {
    this.appSessionService.set(this.appSessionService.NAVIGATION_PAGE_KEY, environment.NAVIGATION_PAGENAME_BADGE);
  }

}
