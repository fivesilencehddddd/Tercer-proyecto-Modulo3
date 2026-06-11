import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { provideStore } from '@ngrx/store';
import { appReducer } from './store';
import { provideBrowserGlobalErrorListeners } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(), 
    provideStore({ appState: appReducer }), 
    importProvidersFrom(FormsModule) 
  ]
};
