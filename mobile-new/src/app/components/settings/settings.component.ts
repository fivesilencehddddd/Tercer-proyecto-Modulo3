import { Component, OnInit, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptFormsModule } from '@nativescript/angular';
import { ApplicationSettings } from '@nativescript/core';

@Component({
  selector: 'ns-settings',
  standalone: true,
  imports: [NativeScriptCommonModule, NativeScriptFormsModule],
  schemas: [NO_ERRORS_SCHEMA],
  template: `
    <StackLayout class="m-4">
      <Label text="Configuración" class="text-lg font-bold mb-1 text-gray-800"></Label>
      <Label [text]="'Usuario actual: ' + usuario" class="text-sm text-gray-500 mb-3"></Label>
      <GridLayout columns="*, auto">
        <TextField col="0" [(ngModel)]="nuevoNombre" hint="Nuevo nombre de usuario..." class="input border border-gray-300 rounded p-2 mr-2 bg-white"></TextField>
        <Button col="1" text="Guardar" (tap)="guardarUsuario()" class="btn bg-blue-600 text-white rounded px-4"></Button>
      </GridLayout>
    </StackLayout>
  `
})
export class SettingsComponent implements OnInit {
  usuario = 'Invitado';
  nuevoNombre = '';

  ngOnInit() {
    this.usuario = ApplicationSettings.getString('username', 'Invitado');
  }

  guardarUsuario() {
    if (this.nuevoNombre.trim()) {
      ApplicationSettings.setString('username', this.nuevoNombre.trim());
      this.usuario = this.nuevoNombre.trim();
      this.nuevoNombre = '';
    }
  }
}