import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { leerAhora } from '../../store';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="background: #f9f9f9; padding: 15px; border: 1px solid #ddd; margin-top: 15px; border-radius: 4px;">
      <h3>Mis Favoritos</h3>
      <p *ngIf="obtenerFavs().length === 0">No tienes favoritos aun.</p>
      <ul>
        <li *ngFor="let fav of obtenerFavs()" style="margin-bottom: 5px;">
          <strong>{{ fav.titulo }}</strong>
          <button (click)="leer(fav)" style="margin-left: 10px; padding: 2px 6px; cursor: pointer;">Leer ahora</button>
        </li>
      </ul>
    </div>
  `
})
export class FavoritosComponent {
  constructor(private store: Store) {}

  obtenerFavs() {
    const local = localStorage.getItem('favs');
    return local ? JSON.parse(local) : [];
  }

  leer(item: any) {
    this.store.dispatch(leerAhora({ item }));
  }
}