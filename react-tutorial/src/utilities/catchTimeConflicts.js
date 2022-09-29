export const catchTimeConflicts = (courses, courseid) => Object.keys(courses).filter(course => course !== courseid && timeIsConflicted(courses[courseid], courses[course]))

const timeIsConflicted = (course1, course2) => {
    const [meets1, meets2] = [course1.meets, course2.meets]
    if (meets1 === "" || meets2 === "") return false

    //term
    const [term1, term2] = [course1.term, course2.term]

    //date
    const [date1, time1] = meets1.split(" ");
    const [date2, time2] = meets2.split(" ");

    return inSameTerm(term1, term2)
        && onSameDate(date1.split(/(?=[A-Z])/), date2.split(/(?=[A-Z])/)) 
        && atSameTime(time1, time2)
}

const compareTime = (time1, time2) => {
    const [h1, m1] = time1.split(':').map(x => parseInt(x, 10));
    const [h2, m2] = time2.split(':').map(x => parseInt(x, 10));
    return h1 > h2 ? 1 : h1 < h2 ? -1 : m1 > m2 ? 1 : m1 < m2 ? -1 : 0
}

const atSameTime = (time1, time2) => {
    const [start1, end1] = time1.split('-');
    const [start2, end2] = time2.split('-');

    return (compareTime(start1, start2) >= 0 && compareTime(start1, end2) <= 0)
    || (compareTime(start2, start1) >= 0 && compareTime(start2, end1) <= 0)
    || (compareTime(start1, start2) >= 0 && compareTime(end1, end2) <= 0)
    || (compareTime(start2, start1) >= 0 && compareTime(end2, end1) <= 0)

}

const onSameDate = (dates1, dates2) => dates1.some(date => dates2.includes(date));
const inSameTerm = (term1, term2) => term1 === term2

