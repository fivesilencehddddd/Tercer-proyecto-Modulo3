import { createAction, createReducer, on, props, createFeatureSelector } from '@ngrx/store';

export const leerAhora = createAction('[Buscador] Leer Ahora', props<{ item: any }>());

export interface AppState {
    leyendo: any[];
}
const initialState: AppState = { leyendo: [] };

export const appReducer = createReducer(
    initialState,
    on(leerAhora, (state, { item }) => {
        if (state.leyendo.find(i => i.id === item.id)) return state;
        return { ...state, leyendo: [...state.leyendo, item] };
    })
);

export const selectLeyendo = createFeatureSelector<AppState>('appState');
