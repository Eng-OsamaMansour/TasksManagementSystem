import {ApolloClient, InMemoryCache, HttpLink, split} from '@apollo/client';
  import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
  import { createClient } from 'graphql-ws';
  import { setContext } from '@apollo/client/link/context';
  import { getMainDefinition } from '@apollo/client/utilities';
  

  const httpLink = new HttpLink({ uri: '/graphql' });
  
  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : ''
      }
    };
  });
  
  /* ----  WebSocket link for subscriptions  ---- */
  const wsLink = new GraphQLWsLink(createClient({
    url: 'ws://localhost:5173/graphql',
    connectionParams: () => ({  
      auth: { token: localStorage.getItem('token') }
    })
  }));
  
  /* ----  choose link based on operation type  ---- */
  const splitLink = split(
    ({ query }) => {
      const def = getMainDefinition(query);
      return def.kind === 'OperationDefinition' && def.operation === 'subscription';
    },
    wsLink,
    authLink.concat(httpLink)
  );
  
  export const apollo = new ApolloClient({  
    link: splitLink,
    cache: new InMemoryCache(),
  });
  