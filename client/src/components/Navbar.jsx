import {Link} from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function Navbar() {
    const { isAuthenticated, logout, user} = useAuth();
    console.log(user);
    return (
        <nav className="flex justify-between items-center bg-zinc-800 p-4 text-white">
            <Link to ="/"> <h1 className='text-3xl font-bold'>Task Manager</h1>
            </Link>

            <ul className="flex gap-x-2">
                {isAuthenticated ? (
                    <>
                    <li>Welcome {user.username}</li>
                    <li> 
                        <Link to="/add-task"> 
                        New Task
                        </Link> 
                    </li> 
                    <li>
                        <Link to="/" onClick={logout}>Logout</Link>
                    </li> 
                    </>
                ):(
                <>
                <li>
                    <Link to="/login"> Login </Link> 
                </li> 
                <li>    
                    <Link to="/register"> Register </Link>                </li> 
                </>
            )}
            </ul>
        </nav>
    )
}
export default Navbar