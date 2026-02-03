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

// Core Subjects Pages
import DBMS from "./pages/DBMS";
import OperatingSystem from "./pages/OperatingSystem";
import ComputerNetworks from "./pages/ComputerNetworks";
import DSA from "./pages/DSA";
import SoftwareEngineering from "./pages/SoftwareEngineering";
import OOPs from "./pages/OOPs";
import SystemDesign from "./pages/SystemDesign";
import ComputerFundamentals from "./pages/ComputerFundamentals";

import AIInterviewHome from "./pages/AIInterviewHome";
import InterviewSession from "./pages/InterviewSession";
import InterviewFeedback from "./pages/InterviewFeedback";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/student/dashboard"
          element={
            <PrivateRoute>
              <StudentDashboard />
            </PrivateRoute>
          }
        />
        <Route path="/placement-prep" element={<PlacementPrep />} />
        <Route
          path="/placement-prep/core-subjects"
          element={<CoreSubjects />}
        />
        <Route path="/placement-prep/aptitude" element={<Aptitude />} />
        <Route
          path="/placement-prep/resume-analyzer"
          element={<ResumeAnalyzer />}
        />
        {/* Core Subjects Individual Pages */}
        <Route path="/placement-prep/core-subjects/dbms" element={<DBMS />} />
        <Route
          path="/placement-prep/core-subjects/os"
          element={<OperatingSystem />}
        />
        <Route
          path="/placement-prep/core-subjects/cn"
          element={<ComputerNetworks />}
        />
        <Route path="/placement-prep/core-subjects/dsa" element={<DSA />} />
        <Route
          path="/placement-prep/core-subjects/se"
          element={<SoftwareEngineering />}
        />
        <Route path="/placement-prep/core-subjects/oops" element={<OOPs />} />
        <Route
          path="/placement-prep/core-subjects/system-design"
          element={<SystemDesign />}
        />
        <Route
          path="/placement-prep/core-subjects/fundamentals"
          element={<ComputerFundamentals />}
        />
        {/* Optional: Aptitude Subsections (if implemented) */}
        <Route
          path="/placement-prep/aptitude/quantitative"
          element={<div>Quantitative Aptitude</div>}
        />
        <Route
          path="/placement-prep/aptitude/logical"
          element={<div>Logical Reasoning</div>}
        />
        <Route
          path="/placement-prep/aptitude/verbal"
          element={<div>Verbal Ability</div>}
        />
        <Route
          path="/placement-prep/aptitude/data-interpretation"
          element={<div>Data Interpretation</div>}
        />
        <Route path="/ai-interview" element={<AIInterviewHome />} />
        <Route
          path="/ai-interview/session/:id"
          element={<InterviewSession />}
        />
        //feedback
        <Route
          path="/ai-interview/feedback/:id"
          element={<InterviewFeedback />}
        />
      </Routes>
    </Router>
  );
}

export default App;
