/* global __DEVTOOLS__ */
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import createLogger from 'redux-logger';

const loggerMiddleware = createLogger({
	level: 'info',
	collapsed: true
});

/**
 * Creates a preconfigured store.
 */
export default function configureStore(initialState) {
	let createStoreWithMiddleware;

	if (typeof __DEVTOOLS__ !== 'undefined' && __DEVTOOLS__) {
		const DevTools = require('components/Devtools').default;

		createStoreWithMiddleware = compose(
			applyMiddleware(
				loggerMiddleware),
			DevTools.instrument()
		)(createStore);
	} else {
		createStoreWithMiddleware = compose(
//			applyMiddleware(middleware),
		)(createStore);
	}

	const store = createStoreWithMiddleware(rootReducer, initialState);

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('../reducers', () => {
			const nextRootReducer = require('../reducers');
			store.replaceReducer(nextRootReducer);
		});
	}

	return store;
}
