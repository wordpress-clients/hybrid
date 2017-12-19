import { StoreModule, combineReducers } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { Reducers } from './reducers';

export function reducer(state: any, action: any) {
  return combineReducers(Reducers)(state, action);
}

const store = [
  StoreModule.provideStore(reducer),
]

if (__DEV__) {
  store.push(StoreDevtoolsModule.instrumentOnlyWithExtension())
}

export const STORE = store;