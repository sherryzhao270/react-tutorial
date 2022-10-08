//import { useJsonQuery } from '../utilities/fetch'
import Banner from './Banner';
import TermPage from './TermPage';
import { useDbData } from '../utilities/firebase';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CourseEditor from './CourseEditor';

const Main = () => {
    const [schedule, error] = useDbData('/');

    if (error) return <h1>Error loading data: {error.toString()}</h1>;
    if (schedule === undefined) return <h1>Loading data...</h1>;
    if (!schedule) return <h1>No data found</h1>;
  
    return <BrowserRouter>
        <Banner title={schedule.title} />
        <Routes>
            <Route path="/" element={<TermPage courses={schedule.courses} />} />
            <Route path="/courses/:id" element={<CourseEditor />} />
        </Routes>
    </BrowserRouter>
    
}

export default Main;