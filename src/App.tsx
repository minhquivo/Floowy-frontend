import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
    </Router>
  )
}

export default App
