import ReactDOM from 'react-dom/client'
import { useState } from 'react'

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate,
    useParams,
    useNavigate,
} from "react-router-dom"


const Home = () => (
    <div>
        <h2>227 Task app</h2>
        <p>
            Do you and your family have a lot of recurring tasks that you need to do every so often?<br/>
            <em>Do you often forget to do those tasks?</em><br/>
            Does someone else need to remind you to do that task, and are they often frustrated about it?<br/>
            Do you need to prioritize some tasks over others?
        </p>
        <p><strong>Well this is the app for you!</strong>
        </p>
    </div>
)

const Task = ({ tasks }) => {
    const id = useParams().id
    const task = tasks.find(t => t.id === Number(id))
    return (
        <div>
            <h2>{task.content}</h2>
            <div>{task.user}</div>
            <div><strong>{task.important ? 'important' : ''}</strong></div>
        </div>
    )
}

const Tasks = ({ tasks }) => (
    <div>
        <h2>Tasks</h2>
        <ul>
            {tasks.map(task =>
                <li key={task.id}>
                    <Link to={`/tasks/${task.id}`}>{task.content}</Link>
                </li>
            )}
        </ul>
    </div>
)

const Users = () => (
    <div>
        <h2>227 tasks app</h2>
        <ul>
            <li>Tommy Tiger Jr</li>
            <li>Khoury Graffiti Rock</li>
            <li>Robert Burns</li>
        </ul>
    </div>
)

const Login = (props) => {
    const navigate = useNavigate()

    const onSubmit = (event) => {
        event.preventDefault()
        props.onLogin('powercat')
        navigate('/')
    }

    return (
        <div>
            <h2>login</h2>
            <form onSubmit={onSubmit}>
                <div>
                    username: <input />
                </div>
                <div>
                    password: <input type='password' />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

const App = () => {
    const [tasks, setTasks] = useState([
        {
            id: 1,
            content: 'Take out the trash',
            important: true,
            user: 'Tommy Tiger Jr'
        },
        {
            id: 2,
            content: 'Wash the dishes',
            important: false,
            user: 'Tommy Tiger Jr'
        },
        {
            id: 3,
            content: 'Hang out',
            important: true,
            user: 'Khoury Graffiti Rock'
        }
    ])

    const [user, setUser] = useState(null)

    const login = (user) => {
        setUser(user)
    }

    const padding = {
        padding: 5
    }

    return (
        <div>
            <Router>
                <div>
                    <Link style={padding} to="/">home</Link>
                    <Link style={padding} to="/tasks">tasks</Link>
                    <Link style={padding} to="/users">users</Link>
                    {user
                        ? <em>{user} logged in</em>
                        : <Link style={padding} to="/login">login</Link>
                    }
                </div>

                <Routes>
                    <Route path="/tasks/:id" element={<Task tasks={tasks} />} />
                    <Route path="/tasks" element={<Tasks tasks={tasks} />} />
                    <Route path="/users" element={user ? <Users /> : <Navigate replace to="/login" />} />
                    <Route path="/login" element={<Login onLogin={login} />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </Router>
            <div>
                <br />
                <em>Task app, Department of Computer Science 2023</em>
            </div>
        </div>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
