import { ApolloProvider } from '@apollo/client';

import graphQlZeroClient from './GraphQlZero/apolloClient';
import PostList from './GraphQlZero/PostList';
// import localClient from './LocalServer/apolloClient';
// import BookList from './LocalServer/BookList';

import './App.css';

const client = graphQlZeroClient;
// const client = localClient;

function App() {
  return (
    <ApolloProvider client={client}>
      <PostList />
      {/* <BookList /> */}
    </ApolloProvider>
  );
}

export default App;
