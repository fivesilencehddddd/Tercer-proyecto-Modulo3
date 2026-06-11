import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { selectLeyendo } from './store';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { FavoritosComponent } from './components/favoritos/favoritos.component';
import { SettingsComponent } from './components/settings/settings.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, BuscadorComponent, FavoritosComponent, SettingsComponent],
  template: `
    <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 30px auto; padding: 10px;">
      <h2>Mini Aplicacion Completa (Angular + Express + Redux)</h2>
      <div style="background: #eef9ff; padding: 15px; border: 1px solid #bce5ff; border-radius: 4px;">
        <h3 style="margin-top: 0;">Seccion: Leyendo Ahora (Reactivo via Redux)</h3>
        <p *ngIf="(leyendo$ | async)?.length === 0" style="color: #666;">No has seleccionado lecturas.</p>
        <ul>
          <li *ngFor="let item of (leyendo$ | async)">
            <strong>{{ item.titulo }}</strong>
          </li>
        </ul>
      </div>
      <hr style="margin: 20px 0; border: 0; border-top: 1px solid #eee;" />
      <app-buscador></app-buscador>
      <app-favoritos></app-favoritos>
      <app-settings></app-settings>
    </div>
  `
})
export class AppComponent {
  leyendo$: Observable<any[]>;

  constructor(private store: Store) {
    this.leyendo$ = this.store.select(selectLeyendo).pipe(
      map((state: any) => state ? state.leyendo : [])
    );
  }
}