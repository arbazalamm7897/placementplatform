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
import AptitudeSectionPage from "./pages/AptitudeSectionPage";
import AptitudeMockTest from "./pages/AptitudeMockTest";

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
import CodingPracticeHome from "./pages/CodingPracticeHome";
import DsaPractice from "./pages/DsaPractice";
import DsaSolve from "./pages/DsaSolve";
import SqlPractice from "./pages/SqlPractice";
import SqlSolve from "./pages/SqlSolve";
import ProgressAnalytics from "./pages/ProgressAnalytics";

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
        <Route
          path="/placement-prep/aptitude/mock-test"
          element={<AptitudeMockTest />}
        />
        <Route path="/placement-prep/aptitude/:section" element={<AptitudeSectionPage />} />
        <Route path="/coding-practice" element={<CodingPracticeHome />} />
        <Route path="/coding-practice/dsa" element={<DsaPractice />} />
        <Route path="/coding-practice/dsa/:id" element={<DsaSolve />} />
        <Route path="/coding-practice/sql" element={<SqlPractice />} />
        <Route path="/coding-practice/sql/:id" element={<SqlSolve />} />
        <Route path="/progress" element={<ProgressAnalytics />} />
        <Route path="/ai-interview" element={<AIInterviewHome />} />
        <Route
          path="/ai-interview/session/:id"
          element={<InterviewSession />}
        />
        {/* Feedback */}
        <Route
          path="/ai-interview/feedback/:id"
          element={<InterviewFeedback />}
        />
      </Routes>
    </Router>
  );
}

export default App;
