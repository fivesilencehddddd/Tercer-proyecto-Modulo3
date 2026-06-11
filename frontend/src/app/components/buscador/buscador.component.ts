import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-buscador',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div style="margin-top: 15px;">
      <input [(ngModel)]="termino" placeholder="Buscar videojuego..." style="padding: 5px;" />
      <button (click)="buscar()" style="padding: 5px; margin-left: 5px;">Buscar</button>
    </div>
    <ul>
      <li *ngFor="let item of resultados" style="margin: 8px 0;">
        <strong>{{ item.titulo }}</strong> - {{ item.descripcion }}
        <button (click)="toggleFavorito(item)" style="margin-left: 10px; background: none; border: none; cursor: pointer; font-size: 1.1em;">
          {{ esFavorito(item) ? 'X' : 'O' }}
        </button>
      </li>
    </ul>
  `
})
export class BuscadorComponent {
  termino: string = '';
  resultados: any[] = [];

  constructor(private api: ApiService) {}

  buscar() {
    this.api.buscarItems(this.termino).subscribe(data => this.resultados = data);
  }

  toggleFavorito(item: any) {
    let favs = this.getFavoritos();
    if (this.esFavorito(item)) {
      favs = favs.filter((f: any) => f.id !== item.id);
    } else {
      favs.push(item);
    }
    localStorage.setItem('favs', JSON.stringify(favs));
  }

  esFavorito(item: any): boolean {
    return this.getFavoritos().some((f: any) => f.id === item.id);
  }

  getFavoritos() {
    const local = localStorage.getItem('favs');
    return local ? JSON.parse(local) : [];
  }
}