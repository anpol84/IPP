import BookList from "./components/BookList";
import AddBook from "./components/AddBook";
import { ApolloClient, InMemoryCache,  ApolloProvider} from '@apollo/client';

const client = new ApolloClient({
  uri:"http://localhost:4000/graphql",
  cache: new InMemoryCache()
});


function App(props) {
  console.log(props)
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>LIBRARY</h1>
        <BookList/>
        <AddBook/>
      </div>
    </ApolloProvider>
  );
}

export default App;
