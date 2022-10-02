//import { useJsonQuery } from '../utilities/fetch'
import Banner from './Banner';
import TermPage from './TermPage';
import { useDbData } from '../utilities/firebase';

const Main = () => {
    const [schedule, error] = useDbData('/');

    if (error) return <h1>Error loading data: {error.toString()}</h1>;
    if (schedule === undefined) return <h1>Loading data...</h1>;
    if (!schedule) return <h1>No data found</h1>;
    // const [schedule, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');
  
    // if (error) return <h1>Error loading user data: {`${error}`}</h1>;
    // if (isLoading) return <h1>Loading user data...</h1>;
    // if (!schedule) return <h1>No user data found</h1>;
  
    return (
        <div>
            <Banner title={schedule.title} />
            <TermPage courses={schedule.courses} />
        </div>
    );
}

export default Main;