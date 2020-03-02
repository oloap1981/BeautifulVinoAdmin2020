import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export class ThemeChangerService {

  constructor(@Inject(DOCUMENT) private document: Document) { };

  public loadStyle(styleName: string) {
    const head = this.document.getElementsByTagName('head')[0];

    const themeLink = this.document.getElementById(
      'stylesheet'
    ) as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = styleName;
    } else {
      const style = this.document.createElement('link');
      style.id = 'client-theme';
      style.rel = 'stylesheet';
      style.href = `${styleName}`;

      head.appendChild(style);
    }
  }
}
