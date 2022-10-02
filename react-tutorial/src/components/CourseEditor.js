import { useFormData } from '../utilities/useFormData';
import { useNavigate, useLocation } from 'react-router-dom';
import { compareTime } from '../utilities/catchTimeConflicts';

const validateUserData = (key, val) => {
  const extractTime = (meets, ind) => {
    return meets.split(" ")[1].toString().split("-")[ind];
  }

  switch (key) {
    case 'title':
      return /(^\w\w)/.test(val) ? '' : 'Must be least two characters';
    case 'meets':
      return (val === '' || 
              /^(?!\s*$)(?:M|Tu|W|Th|F| )+\s([0-1]?[0-9]|2[0-3]):[0-5][0-9]-([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(val))  
              ? (val === '' || compareTime(extractTime(val, 0), extractTime(val, 1)) === -1)
                ? '' 
                : 'Start time should eariler than end time, e.g. MWF 12:00-13:20'
              : 'Must contain days and start-end, e.g., MWF 12:00-13:20';
    default: return '';
  }
};

const InputField = ({name, text, state, change}) => (
  <div className="mb-3">
    <label htmlFor={name} className="form-label">{text}</label>
    <input className="form-control" id={name} name={name} 
      defaultValue={state.values?.[name]} onChange={change} />
    <div className="invalid-feedback">{state.errors?.[name]}</div>
  </div>
);

const ButtonBar = ({message, disabled}) => {
  const navigate = useNavigate();
  return (
    <div className="d-flex">
      <button type="button" className="btn btn-outline-dark me-2" onClick={() => navigate(-1)}>Cancel</button>
      <button type="submit" className="btn btn-primary me-auto" disabled={disabled}>Submit</button>
      <span className="p-2">{message}</span>
    </div>
  );
};

const CourseEditor = () => {
  let location = useLocation();
  //const [update, result] = useDbUpdate(`/users/${user.id}`);
  const [state, setState] = useFormData(validateUserData, location.state);
  
  return (<section>
      <h2>{location.state.code}</h2>
      <form onSubmit={console.log('submitted')} noValidate className={state.errors ? 'was-validated' : null}>
        <InputField name="title" text="Course title" state={state} change={setState} />
        <InputField name="meets" text="Meeting times" state={state} change={setState} />
        <ButtonBar/>
      </form>
    </section>
  )
};

export default CourseEditor;