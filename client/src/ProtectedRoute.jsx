import {Navigate, Outlet} from 'react-router-dom'
import { useAuth } from './context/AuthContext'

function ProtectedRoute () {
    const {user, isAutrenticated} = useAuth();

    if (!isAutrenticated) return <Navigate to="/login" />

    return (
        <Outlet />
    )
}

export default ProtectedRoute