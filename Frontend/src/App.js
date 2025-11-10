import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import StudentDashboard from "./pages/StudentDashboard";
import PrivateRoute from "./components/PrivateRoute";
import PlacementPrep from "./pages/PlacementPrep";
import CoreSubjects from "./pages/CoreSubjects";
import Aptitude from "./pages/Aptitude";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Student Dashboard */}
        <Route
          path="/student/dashboard"
          element={
            <PrivateRoute>
              <StudentDashboard />
            </PrivateRoute>
          }
        />

        {/* Placement Prep */}
        <Route path="/placement-prep" element={<PlacementPrep />} />
        <Route path="/placement-prep/core-subjects" element={<CoreSubjects />} />
        <Route path="/placement-prep/aptitude" element={<Aptitude />} />
        <Route path="/placement-prep/resume-analyzer" element={<ResumeAnalyzer />} />
      </Routes>
    </Router>
  );
}

export default App;
