import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import reducers from './reducers';
console.log('reducers', reducers);
export default [
    StoreModule.provideStore(reducers),
    StoreDevtoolsModule.instrumentOnlyWithExtension()
];