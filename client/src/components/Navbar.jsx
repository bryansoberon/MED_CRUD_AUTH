import {Link} from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function Navbar() {
    const { isAuthenticated, logout, user} = useAuth();
    console.log(user);
    return (
        <nav className="flex justify-between items-center bg-zinc-800 p-4 text-white">
            <Link to ="/tasks"> <h1 className='text-3xl font-bold'>Task Manager</h1>
            </Link>

            <ul className="flex gap-x-2">
                {isAuthenticated ? (
                    <>
                    <li>Welcome {user.username}</li>
                    <li> 
                        <Link to="/add-task"  className='bg-indigo-500 px-4 py-2 rounded-sm'> 
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
                    <Link to="/login" className='bg-indigo-500 px-4 py-2 rounded-sm'> Login </Link> 
                </li> 
                <li>    
                    <Link to="/register" className='bg-indigo-500 px-4 py-2 rounded-sm'> Register </Link>                </li> 
                </>
            )}
            </ul>
        </nav>
    )
}
export default Navbar