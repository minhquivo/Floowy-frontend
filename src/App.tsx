import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import SignIn from './SignIn';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
        </Routes>
    </Router>
  )
}

export default App
