import { bootstrapApplication, runNativeScriptAngularApp, provideNativeScriptHttpClient } from '@nativescript/angular';
import { provideStore } from '@ngrx/store';
import { provideZonelessChangeDetection } from '@angular/core'; 
import { AppComponent } from './app/app.component';
import { appReducer } from './app/store';

runNativeScriptAngularApp({
  appModuleBootstrap: () =>
    bootstrapApplication(AppComponent, {
      providers: [
        provideZonelessChangeDetection(), 
        provideNativeScriptHttpClient(),
        provideStore({ appState: appReducer }),
      ],
    }),
});