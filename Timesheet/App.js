import React, { Component } from 'react';
import AppNav from './src/modules/router/NavigationRouter';
import { Provider } from 'react-redux';
import ConfigureStore from './src/redux/store/ConfigureStore';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './src/redux/combinedReducer/CombinedReducer';


class App extends Component {
	render() {
		//applymidleware is store enhencer
		const store = ConfigureStore();
		// const store = createStore(reducers, applyMiddleware(thunk));

        /* connects different connect tags and insure the 
        get access to store grab all state and pass */
    return (
        <Provider store={store}>
            <AppNav />
        </Provider>
      );
    }
}

export default App;
