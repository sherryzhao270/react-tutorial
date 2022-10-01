import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './Main';
import CourseEditor from './CourseEditor';

const Dispatcher = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/course/:id" element={<CourseEditor />} />
    </Routes>
  </BrowserRouter>
);

export default Dispatcher;