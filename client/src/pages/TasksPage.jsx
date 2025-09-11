import { useEffect } from 'react';
import { useTasks } from '../context/TaskContext'

function TasksPage() {

    const {getTasks} = useTasks();

    useEffect(() =>{
        getTasks();
    })

    return (
        <div>TasksPage</div>
    )
}

export default TasksPage