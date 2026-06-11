import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptFormsModule } from '@nativescript/angular';
import { ApplicationSettings } from '@nativescript/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { selectLeyendo, leerAhora } from './store';
import { ApiService } from './services/api.service';

@Component({
  selector: 'ns-buscador',
  standalone: true,
  imports: [NativeScriptCommonModule, NativeScriptFormsModule],
  schemas: [NO_ERRORS_SCHEMA],
  template: `
    <StackLayout>
      <Label text="Buscar Videojuego" style="font-size:16;font-weight:bold;margin-bottom:8;"></Label>
      <GridLayout columns="*, auto">
        <TextField col="0" [(ngModel)]="termino" hint="Buscar videojuego..." returnKeyType="search" (returnPress)="buscar()" style="margin-right:5;"></TextField>
        <Button col="1" text="Buscar" (tap)="buscar()" style="background-color:#3b82f6;color:white;border-radius:4;"></Button>
      </GridLayout>
      <Label *ngIf="buscado && resultados.length === 0" text="Sin resultados." style="color:#9ca3af;margin-top:8;"></Label>
      <ListView *ngIf="resultados.length > 0" [items]="resultados" [height]="resultados.length * 80">
        <ng-template let-item="item">
          <GridLayout columns="*, auto" style="padding:8;">
            <StackLayout col="0" verticalAlignment="center">
              <Label [text]="item.titulo" style="font-weight:bold;" textWrap="true"></Label>
              <Label [text]="item.descripcion" style="color:#6b7280;font-size:12;" textWrap="true"></Label>
            </StackLayout>
            <Button col="1" [text]="esFavorito(item) ? '★' : '☆'" (tap)="toggleFavorito(item)" style="font-size:22;" verticalAlignment="center"></Button>
          </GridLayout>
        </ng-template>
      </ListView>
    </StackLayout>
  `
})
export class BuscadorComponent {
  termino = '';
  resultados: any[] = [];
  buscado = false;
  constructor(private api: ApiService) {}
  buscar() {
    if (!this.termino.trim()) return;
    this.buscado = false;
    this.api.buscarItems(this.termino).subscribe({
      next: (data) => { this.resultados = data; this.buscado = true; },
      error: () => { this.resultados = []; this.buscado = true; }
    });
  }
  toggleFavorito(item: any) {
    let favs = this.getFavoritos();
    if (this.esFavorito(item)) { favs = favs.filter((f: any) => f.id !== item.id); }
    else { favs.push(item); }
    ApplicationSettings.setString('favs', JSON.stringify(favs));
    this.resultados = [...this.resultados];
  }
  esFavorito(item: any): boolean { return this.getFavoritos().some((f: any) => f.id === item.id); }
  getFavoritos(): any[] { return JSON.parse(ApplicationSettings.getString('favs', '[]')); }
}

@Component({
  selector: 'ns-favoritos',
  standalone: true,
  imports: [NativeScriptCommonModule],
  schemas: [NO_ERRORS_SCHEMA],
  template: `
    <StackLayout>
      <Label text="Mis Favoritos" style="font-size:16;font-weight:bold;margin-bottom:8;"></Label>
      <Label *ngIf="obtenerFavs().length === 0" text="No tienes favoritos aún." style="color:#9ca3af;"></Label>
      <ListView *ngIf="obtenerFavs().length > 0" [items]="obtenerFavs()" [height]="obtenerFavs().length * 60">
        <ng-template let-fav="item">
          <GridLayout columns="*, auto" style="padding:8;">
            <Label col="0" [text]="fav.titulo" style="font-weight:bold;" verticalAlignment="center" textWrap="true"></Label>
            <Button col="1" text="Leer ahora" (tap)="leer(fav)" style="background-color:#3b82f6;color:white;border-radius:4;font-size:12;"></Button>
          </GridLayout>
        </ng-template>
      </ListView>
    </StackLayout>
  `
})
export class FavoritosComponent {
  constructor(private store: Store) {}
  obtenerFavs(): any[] { return JSON.parse(ApplicationSettings.getString('favs', '[]')); }
  leer(item: any) { this.store.dispatch(leerAhora({ item })); }
}

@Component({
  selector: 'ns-settings',
  standalone: true,
  imports: [NativeScriptCommonModule, NativeScriptFormsModule],
  schemas: [NO_ERRORS_SCHEMA],
  template: `
    <StackLayout>
      <Label text="Configuración" style="font-size:16;font-weight:bold;margin-bottom:4;"></Label>
      <Label [text]="'Usuario actual: ' + usuario" style="color:#6b7280;margin-bottom:8;"></Label>
      <GridLayout columns="*, auto">
        <TextField col="0" [(ngModel)]="nuevoNombre" hint="Nuevo nombre de usuario..." style="margin-right:5;"></TextField>
        <Button col="1" text="Guardar" (tap)="guardarUsuario()" style="background-color:#3b82f6;color:white;border-radius:4;"></Button>
      </GridLayout>
    </StackLayout>
  `
})
export class SettingsComponent implements OnInit {
  usuario = 'Invitado';
  nuevoNombre = '';
  ngOnInit() { this.usuario = ApplicationSettings.getString('username', 'Invitado'); }
  guardarUsuario() {
    if (this.nuevoNombre.trim()) {
      ApplicationSettings.setString('username', this.nuevoNombre.trim());
      this.usuario = this.nuevoNombre.trim();
      this.nuevoNombre = '';
    }
  }
}

@Component({
  selector: 'ns-app',
  standalone: true,
  schemas: [NO_ERRORS_SCHEMA],
  imports: [NativeScriptCommonModule, BuscadorComponent, FavoritosComponent, SettingsComponent],
  template: `
    <Page>
      <ActionBar title="App NgRx + NativeScript"></ActionBar>
      <ScrollView>
        <StackLayout style="padding:16;">
          <Label text="Leyendo Ahora" style="font-size:20;font-weight:bold;margin-bottom:8;"></Label>
          <Label *ngIf="(leyendo$ | async)?.length === 0" text="No has seleccionado lecturas aún." style="color:#9ca3af;margin-bottom:10;"></Label>
          <ListView *ngIf="(leyendo$ | async)?.length > 0" [items]="leyendo$ | async" [height]="((leyendo$ | async)?.length || 0) * 50">
            <ng-template let-item="item">
              <Label [text]="'• ' + item.titulo" style="padding:8;font-weight:bold;"></Label>
            </ng-template>
          </ListView>
          <StackLayout height="1" backgroundColor="#e5e7eb" style="margin:16 0;"></StackLayout>
          <ns-buscador></ns-buscador>
          <StackLayout height="1" backgroundColor="#e5e7eb" style="margin:16 0;"></StackLayout>
          <ns-favoritos></ns-favoritos>
          <StackLayout height="1" backgroundColor="#e5e7eb" style="margin:16 0;"></StackLayout>
          <ns-settings></ns-settings>
        </StackLayout>
      </ScrollView>
    </Page>
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