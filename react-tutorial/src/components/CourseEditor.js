import { useFormData } from '../utilities/useFormData';
import { useNavigate, useLocation } from 'react-router-dom';

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
      
      <span className="p-2">{message}</span>
    </div>
  );
};

const CourseEditor = () => {
  let location = useLocation();
  //const [update, result] = useDbUpdate(`/users/${user.id}`);
  const [state, changeState] = useFormData(null, location.state);
  
  return (<section>
      <h2>{location.state.code}</h2>
      <form onSubmit={console.log('submitted')}>
        <InputField name="title" text="Course title" state={state} change={changeState} />
        <InputField name="meets" text="Meeting times" state={state} change={changeState} />
        <ButtonBar/>
      </form>
    </section>
  )
};

export default CourseEditor;