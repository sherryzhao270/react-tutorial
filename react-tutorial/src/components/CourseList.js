const CourseList = ({courses}) => {
    let courseKeys = Object.keys(courses)
    return <div> 
        {courseKeys.map(key => <div> {courses[key].term} CS {courses[key].number}: {courses[key].title}</div>)} 
    </div>
}

export default CourseList;