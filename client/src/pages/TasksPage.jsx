import { useAuth } from '../context/AuthContext'

function TasksPage() {

    const {user} = useAuth();

    return (
        <div>TasksPage</div>
    )
}

export default TasksPage