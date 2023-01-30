import {
    BrowserRouter as Router,
    Routes, Route, Link
} from "react-router-dom"

const Home = () => (
    <div> <h2>227 Tasks App</h2> </div>
)

const Tasks = () => (
    <div> <h2>Tasks</h2> </div>
)

const Users = () => (
    <div> <h2>Users</h2> </div>
)

const App = () => {

    const padding = {
        padding: 5
    }

    return (
        <Router>
            <div>
                <Link style={padding} to="/">home</Link>
                <Link style={padding} to="/tasks">tasks</Link>
                <Link style={padding} to="/users">users</Link>
            </div>

            <Routes>
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/users" element={<Users />} />
                <Route path="/" element={<Home />} />
            </Routes>

            <div>
                <em>Task app, Department of Computer Science 2023</em>
            </div>
        </Router>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
