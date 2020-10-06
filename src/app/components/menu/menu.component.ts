import { Component } from '@angular/core';

import { PoMenuItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  constructor() { }

  readonly menus: Array<PoMenuItem> = [
    { label: 'Listagem', action: this.onClick.bind(this) },
    { label: 'Adicionar', action: this.onClick.bind(this) }
  ];

  private onClick(): void {
    alert('Clicked in menu item');
  }


}
