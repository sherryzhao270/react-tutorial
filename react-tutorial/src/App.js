import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Main from './components/Main';
//import Dispatcher from './components/Dispatcher';


const queryClient = new QueryClient();

const App = () => {
  return <QueryClientProvider client={queryClient}>
    <div className="container">
      <Main/>
    </div>
  </QueryClientProvider>
};

export default App;
