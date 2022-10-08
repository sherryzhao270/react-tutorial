import { Link } from 'react-router-dom';

export const firstLastName = (user) => (
  user ? `${user.displayName}` : 'Unknown user'
);

const User = ({profile, user}) => (
  user 
    ? <div>
        <h3>
        { firstLastName(user) }  
        { 
            profile?.isAdmin && 
            <Link to={`/users/${user.uid}/edit`} style={{fontSize: '0.7em', marginLeft: '2em'}}>
            <i className="bi bi-pencil"></i>
            </Link> }
        </h3>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phoneNumber}</p>
    </div>
    : <div><h3>Guest</h3></div>
);

export default User;