import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Dispatcher from './components/Dispatcher';

const queryClient = new QueryClient();

const App = () => {
  return <QueryClientProvider client={queryClient}>
    <div className="container">
      <Dispatcher/>
    </div>
  </QueryClientProvider>
};

export default App;
