import TermSelector from "./TermSelector";
import CourseList from "./CourseList";
import { useState } from "react";

const TermPage = ({courses}) => {
    const [selectedTerm, setSelectedTerm] = useState('Fall');

    return (
        <div>
            <TermSelector selection={selectedTerm} setSelection={setSelectedTerm}/>
            <CourseList courses={courses} selection={selectedTerm}/>
        </div>
    
    )
}

export default TermPage;