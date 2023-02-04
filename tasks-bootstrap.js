import ReactDOM from 'react-dom/client'
import {useState} from 'react'

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate,
    useParams,
    useNavigate,
    useMatch
} from "react-router-dom"
import {Alert, Button, Form, Nav, Navbar, Table} from "react-bootstrap";


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

const Task = ({ task }) => {
    return (
        <div>
            <h2>{task.content}</h2>
            <div>{task.user}</div>
            <div><strong>{task.important ? 'important' : ''}</strong></div>
        </div>
    )
}

const Tasks = ({tasks}) => (
    <div>
        <h2>Tasks</h2>
        <Table striped>
            <tbody>
            {tasks.map(task =>
                <tr key={task.id}>
                    <td>
                        <Link to={`/tasks/${task.id}`}>
                            {task.content}
                        </Link>
                    </td>
                    <td>
                        {task.user}
                    </td>
                </tr>
            )}
            </tbody>
        </Table>
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
            <Form onSubmit={onSubmit}>
                <Form.Group>
                    <Form.Label>username:</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                    />
                    <Form.Label>password:</Form.Label>
                    <Form.Control
                        type="password"
                    />
                    <Button variant="primary" type="submit">
                        login
                    </Button>
                </Form.Group>
            </Form>
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
    const [message, setMessage] = useState(null)

    const login = (user) => {
        setUser(user)
        setMessage(`welcome ${user}`)
        setTimeout(() => {
            setMessage(null)
        }, 10000)
    }

    const padding = {
        padding: 5
    }

    const match = useMatch('/tasks/:id')
    const task = match
        ? tasks.find(task => task.id === Number(match.params.id))
        : null

    return (
        <div className="container">
            {(message &&
                <Alert variant="success">
                    {message}
                </Alert>
            )}
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#" as="span">
                                <Link style={padding} to="/">home</Link>
                            </Nav.Link>
                            <Nav.Link href="#" as="span">
                                <Link style={padding} to="/tasks">tasks</Link>
                            </Nav.Link>
                            <Nav.Link href="#" as="span">
                                <Link style={padding} to="/users">users</Link>
                            </Nav.Link>
                            <Nav.Link href="#" as="span">
                                {user
                                    ? <em style={padding}>{user} logged in</em>
                                    : <Link style={padding} to="/login">login</Link>
                                }
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>

            <Routes>
                <Route path="/tasks/:id" element={<Task task={task}/>}/>
                <Route path="/tasks" element={<Tasks tasks={tasks}/>}/>
                <Route path="/users" element={user ? <Users/> : <Navigate replace to="/login"/>}/>
                <Route path="/login" element={<Login onLogin={login}/>}/>
                <Route path="/" element={<Home/>}/>
            </Routes>
            <footer>
                <br/>
                <em>Task app, Department of Computer Science 2023</em>
            </footer>
        </div>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
        <App/>
    </Router>
)
