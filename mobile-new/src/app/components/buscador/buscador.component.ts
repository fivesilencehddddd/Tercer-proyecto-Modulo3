import { Component, NO_ERRORS_SCHEMA, OnDestroy } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptFormsModule } from '@nativescript/angular';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { buscarLecturas, agregarAFavoritos, eliminarDeFavoritos, selectResultados, selectFavoritos } from '../store';

@Component({
  selector: 'ns-buscador',
  standalone: true,
  imports: [NativeScriptCommonModule, NativeScriptFormsModule],
  schemas: [NO_ERRORS_SCHEMA],
  template: `
    <StackLayout class="m-4">
      <Label text="Buscar Videojuego" class="text-lg font-bold mb-2 text-gray-800"></Label>
      <GridLayout columns="*, auto" class="mb-3">
        <TextField col="0" [(ngModel)]="termino" hint="Buscar videojuego..." returnKeyType="search" (returnPress)="buscar()" class="input border border-gray-300 rounded p-2 mr-2 bg-white"></TextField>
        <Button col="1" text="Buscar" (tap)="buscar()" class="btn bg-blue-600 text-white rounded px-4"></Button>
      </GridLayout>
      
      <StackLayout *ngIf="{ lista: resultados$ | async } as resultados">
        <Label *ngIf="buscado && (!resultados.lista || resultados.lista.length === 0)" text="Sin resultados." class="text-gray-400 text-sm"></Label>
        
        <ListView *ngIf="resultados.lista && resultados.lista.length > 0" [items]="resultados.lista" [height]="resultados.lista.length * 80">
          <ng-template let-item="item">
            <GridLayout columns="*, auto" class="p-2 border-b border-gray-200">
              <StackLayout col="0" verticalAlignment="center">
                <Label [text]="item.titulo" class="font-bold text-gray-800" textWrap="true"></Label>
                <Label [text]="item.descripcion" class="text-xs text-gray-500" textWrap="true"></Label>
              </StackLayout>
              <Button col="1" [text]="esFavorito(item.id) ? '★' : '☆'" (tap)="toggleFavorito(item)" class="text-2xl text-yellow-500" verticalAlignment="center"></Button>
            </GridLayout>
          </ng-template>
        </ListView>
      </StackLayout>
    </StackLayout>
  `
})
export class BuscadorComponent implements OnDestroy {
  termino = '';
  buscado = false;
  resultados$: Observable<any[]>;
  favoritos: any[] = [];
  private sub = new Subscription();

  constructor(private store: Store) {
    this.resultados$ = this.store.select(selectResultados);
    this.sub.add(
      this.store.select(selectFavoritos).subscribe(favs => {
        this.favoritos = favs || [];
      })
    );
  }

  buscar() {
    if (!this.termino.trim()) return;
    this.buscado = true;
    this.store.dispatch(buscarLecturas({ termino: this.termino }));
  }

  toggleFavorito(item: any) {
    if (this.esFavorito(item.id)) {
      this.store.dispatch(eliminarDeFavoritos({ id: item.id }));
    } else {
      this.store.dispatch(agregarAFavoritos({ item }));
    }
  }

  esFavorito(id: number): boolean {
    return this.favoritos.some((f: any) => f.id === id);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}