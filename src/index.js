/* eslint-disable import/default */

import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Router, browserHistory } from 'react-router';
import {routes} from './routes';
import configureStore from './store/configureStore';
require('./favicon.ico');
import './index.scss';
import { syncHistoryWithStore } from 'react-router-redux';
const store = configureStore();

const client = new ApolloClient({
  // By default, this client will send queries to the
  //  `/graphql` endpoint on the same host
  // Pass the configuration option { uri: YOUR_GRAPHQL_API_URL } to the `HttpLink` to connect
  // to a different host
  link: new WebSocketLink({
    uri: 'ws://localhost:4000/subscriptions',
    options: { reconnect: true },
  }),
  cache: new InMemoryCache()
});

const history = syncHistoryWithStore(browserHistory, store);
render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Router history={history} routes={routes(store)}/>
    </Provider>
  </ApolloProvider>, 
  document.getElementById('app')
);
