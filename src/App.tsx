import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Purpose from "./pages/Purpose";
import Sync from "./pages/Sync";
import MoodDetectionScreen from "./pages/MoodDetection";
import MainScreen from "./pages/MainScreen";
import Playing from "./pages/Playing";
import PlayingPage from "./pages/PlayingAI";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/purpose" element={<Purpose />} />
        <Route path="/sync" element={<Sync />} />
        <Route path="/mood-detection" element={<MoodDetectionScreen />} />
        <Route path="/main" element={<MainScreen />} />
        <Route path="/playing" element={<Playing />} />
        <Route path="/playing-ai" element={<PlayingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
