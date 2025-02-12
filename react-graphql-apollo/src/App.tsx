import { ApolloProvider } from '@apollo/client';

import graphQlZeroClient from './GraphQlZero/apolloClient';
import PostList from './GraphQlZero/PostList';
// import localClient from './LocalServer/apolloClient';
// import UserList from './LocalServer/UserList';

import './App.css';

const client = graphQlZeroClient;
// const client = localClient;

function App() {
  return (
    <ApolloProvider client={client}>
      <PostList />
      {/* <UserList /> */}
    </ApolloProvider>
  );
}

export default App;
