import Banner from './Banner';
import TermPage from './TermPage';
import { useAuthState, useDbData } from '../utilities/firebase';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CourseEditor from './CourseEditor';
import User from './User';
import { useProfile } from '../utilities/profile';

const Main = () => {
    let [schedule, error] = useDbData('/');
    const [user] = useAuthState();
    const [profile, profileLoading, profileError] = useProfile();

    let fetching;
    if (error) fetching = `<h1>Error loading data: ${error.toString()}</h1>`;
    if (schedule === undefined) fetching = "Loading data...";
    if (!schedule) fetching = "No data found";

    if (profileError) fetching = `Error loading profile: ${profileError}`;
    if (profileLoading) fetching = "Loading user profile";
    if (!profile) fetching = "No profile data";
  
    return <BrowserRouter>
        <Banner title={schedule ? schedule.title : fetching} />
        {schedule && <Routes>
            <Route path="/" element={<TermPage courses={schedule.courses} />} />
            <Route path="/courses/:id" element={<CourseEditor />} />
            <Route path="/users" element={<User profile={profile} user={user} />} />
        </Routes>}
    </BrowserRouter>
    
}

export default Main;