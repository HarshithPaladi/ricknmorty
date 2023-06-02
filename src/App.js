import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import CharactersComponent from './components/RicknMortyComponent/CharactersComponent';
const queryClient = new QueryClient();
function App() {
  return (
    <div className='App'>
      <div className='container'>
        <h1>Rick n Morty Adventures</h1>
        <QueryClientProvider client={queryClient}>
          <CharactersComponent/>
        </QueryClientProvider>
      </div>
    </div>

  );
}

export default App;
