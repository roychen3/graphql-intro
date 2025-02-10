import { ApolloProvider } from '@apollo/client'

import client from './GraphQlZero/apolloClient'
import PostList from './GraphQlZero/PostList'

import './App.css'

function App() {
  return (
    <ApolloProvider client={client}>
      <PostList />
    </ApolloProvider>

  )
}

export default App
