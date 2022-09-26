import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Banner from './components/Banner';
import TermPage from './components/TermPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJsonQuery } from './utilities/fetch';

const Main = () => {
  const [schedule, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');

  if (error) return <h1>Error loading user data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading user data...</h1>;
  if (!schedule) return <h1>No user data found</h1>;

  return (
    <div>
      <Banner title={schedule.title} />
      <TermPage courses={schedule.courses} />
    </div>
  );
}

const queryClient = new QueryClient();

const App = () => {
  return <QueryClientProvider client={queryClient}>
    <div className="container">
      <Main />
    </div>
  </QueryClientProvider>
};

export default App;
