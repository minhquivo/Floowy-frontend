import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Purpose from './pages/Purpose';
import Sync from './pages/Sync';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/purpose" element={<Purpose />} />
          <Route path="/sync" element={<Sync />} />
        </Routes>
    </Router>
  )
}

export default App
