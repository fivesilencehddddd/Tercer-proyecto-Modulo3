import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div style="border: 1px dashed #aaa; padding: 15px; margin-top: 15px; border-radius: 4px; background: #fffdf5;">
      <h3>Seccion Settings (Usuario actual: <span style="color: blue;">{{ usuario }}</span>)</h3>
      <input [(ngModel)]="nuevoNombre" placeholder="Nuevo nombre de usuario..." style="padding: 5px;" />
      <button (click)="guardarUsuario()" style="padding: 5px; margin-left: 5px;">Guardar Usuario</button>
    </div>
  `
})
export class SettingsComponent implements OnInit {
  usuario: string = 'Invitado';
  nuevoNombre: string = '';

  ngOnInit() {
    const guardado = localStorage.getItem('username');
    if (guardado) this.usuario = guardado;
  }

  guardarUsuario() {
    if (this.nuevoNombre.trim()) {
      localStorage.setItem('username', this.nuevoNombre);
      this.usuario = this.nuevoNombre;
      this.nuevoNombre = '';
    }
  }
}