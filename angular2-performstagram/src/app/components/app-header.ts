import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-header',
    styles: [require('./_header.styl').toString()],
    template: `
    <div>
                <header class="header">
                    <div class="header__wrapper">
                        <ul class="header__wrapper_actions">
                                 <li *ngIf="authenticated | async">
                                        <button class="btn" (click)="signOut.emit()">Sign out</button>
                                    </li>
                            <li>
                                <a
                                    class="fa fa-github fa-lg"
                                    href="https://github.com/Ixl123/performstagram"></a>
                            </li>
                        </ul>
                    </div>
                    <div class="g-row">
                        <div class="g-col">
                            <h1>
                            <a routerLink="/" routerLinkActive="active">
                               Performstagram 3000 </a>
                            </h1>
                        </div>
                    </div>
                </header>
            </div>
  `
})

export class AppHeaderComponent {
    @Input()authenticated : boolean;
    @Output()signOut = new EventEmitter(false);

}
