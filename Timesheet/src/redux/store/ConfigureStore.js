import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../combinedReducer/CombinedReducer';

export default function ConfigureStore() {
	const store = createStore(reducers, applyMiddleware(thunk));
	return store;
}
