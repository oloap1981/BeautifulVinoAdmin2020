import { Component, HostBinding } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

    title = 'BeautifulVinoAdmin2020';

    firstColor = '#e51d70'; /* default BV #e51d70 */
    secondColor = '#f9da2c'; /* Default BV #f9da2c */


    @HostBinding('attr.style')
    public get valueAsStyle(): any {
        return this.sanitizer.bypassSecurityTrustStyle(`--first-color: ${this.firstColor}; --second-color: ${this.secondColor};`);
    }

    constructor(
        private sanitizer: DomSanitizer
    ) {
        this.initializeApp();
    }

    initializeApp() {
    }
}
