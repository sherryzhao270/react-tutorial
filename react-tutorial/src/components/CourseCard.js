import './CourseCard.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";
import { useProfile } from '../utilities/profile';

const CourseCard = ({ id, title, name, time, selected, toggleSelected, confiltedCourses }) => {

    const [{ isAdmin }] = useProfile();

    let navigate = useNavigate();
    const gotoCourseForm = (id) => {
        let path = `/courses/${id}`;
        navigate(path,
            {
                state: {
                    id: id,
                    code: title,
                    title: name,
                    meets: time
                }
            });
    }

    return <div className={`card m-1 p-2 ${selected.includes(id) ? 'selected' : ''} ${confiltedCourses.includes(id) ? 'conflicted' : ''}`}
                data-cy="course"
                onClick={() => toggleSelected(id)}>
        <div className="card-body">
            {isAdmin && <button type="button" className="btn btn-link edit-btn" onClick={() => gotoCourseForm(id)}>
                <i className="bi bi-pencil-square"></i>
            </button>}
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{name}</p>
        </div>
        <div className={`card-footer ${selected.includes(id) ? 'selected' : ''} ${confiltedCourses.includes(id) ? 'conflicted' : ''}`}>{time}</div>
    </div>
}

export default CourseCard;