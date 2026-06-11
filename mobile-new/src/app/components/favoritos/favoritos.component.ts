import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ApplicationSettings } from '@nativescript/core';
import { Store } from '@ngrx/store';
import { leerAhora } from '../../store';

@Component({
  selector: 'ns-favoritos',
  schemas: [NO_ERRORS_SCHEMA],
  template: `
    <StackLayout class="m-4">
      <Label text="Mis Favoritos" class="text-lg font-bold"></Label>
      <Label *ngIf="obtenerFavs().length === 0" text="No tienes favoritos aún."></Label>
      <ListView *ngIf="obtenerFavs().length > 0" [items]="obtenerFavs()" [height]="obtenerFavs().length * 60">
        <ng-template let-fav="item">
          <GridLayout columns="*, auto" class="p-2">
            <Label col="0" [text]="fav.titulo" class="font-bold" verticalAlignment="center" textWrap="true"></Label>
            <Button col="1" text="Leer ahora" (tap)="leer(fav)"></Button>
          </GridLayout>
        </ng-template>
      </ListView>
    </StackLayout>
  `
})
export class FavoritosComponent {
  constructor(private store: Store) {}

  obtenerFavs(): any[] {
    return JSON.parse(ApplicationSettings.getString('favs', '[]'));
  }

  leer(item: any) {
    this.store.dispatch(leerAhora({ item }));
  }
}