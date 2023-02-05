import ReactDOM from 'react-dom/client'
import {useState} from 'react'

import {BrowserRouter as Router, Link, Navigate, Route, Routes, useMatch, useNavigate} from "react-router-dom"
import {
    Alert,
    AppBar,
    Button,
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TextField,
    Toolbar
} from "@mui/material";


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

const Task = ({task}) => {
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

        <TableContainer component={Paper}>
            <Table>
                <TableBody>
                    {tasks.map(task => (
                        <TableRow key={task.id}>
                            <TableCell>
                                <Link to={`/tasks/${task.id}`}>{task.content}</Link>
                            </TableCell>
                            <TableCell>
                                {task.user}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
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
                    <TextField label="username"/>
                </div>
                <div>
                    <TextField label="password" type='password'/>
                </div>
                <div>
                    <Button variant="contained" color="primary" type="submit">
                        login
                    </Button>
                </div>
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
    const [message, setMessage] = useState(null)

    const login = (user) => {
        setUser(user)
        setMessage(`welcome ${user}`)
        setTimeout(() => {
            setMessage(null)
        }, 10000)
    }

    const match = useMatch('/tasks/:id')
    const task = match
        ? tasks.find(task => task.id === Number(match.params.id))
        : null

    const roboto = {
        fontFamily: "Roboto"
    }

    return (
        <Container style={roboto}>
            <div>
                {(message &&
                    <Alert severity="success">
                        {message}
                    </Alert>
                )}
                <AppBar position="static">
                    <Toolbar>
                        <Button color="inherit" component={Link} to="/">
                            home
                        </Button>
                        <Button color="inherit" component={Link} to="/tasks">
                            tasks
                        </Button>
                        <Button color="inherit" component={Link} to="/users">
                            users
                        </Button>
                        {user
                            ? <em>{user} logged in</em>
                            : <Button color="inherit" component={Link} to="/login">
                                login
                            </Button>
                        }
                    </Toolbar>
                </AppBar>
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
        </Container>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
        <App/>
    </Router>
)
