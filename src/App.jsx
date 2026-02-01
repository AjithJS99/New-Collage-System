import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
// Import pages as we create them
import { Login } from './pages/Login';
import { Register } from './pages/Register';

import { Dashboard } from './pages/Dashboard';
import { StudentList } from './pages/StudentList';
import { TeacherList } from './pages/TeacherList';
import { EmailHistory } from './pages/EmailHistory';
import { CourseManager } from './pages/CourseManager';
import { Attendance } from './pages/Attendance';
import { Exams } from './pages/Exams';
import { Fees } from './pages/Fees';
import { Library } from './pages/Library';
import { Events } from './pages/Events';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="students" element={<StudentList />} />
          <Route path="teachers" element={<TeacherList />} />
          <Route path="email-logs" element={<EmailHistory />} />
          <Route path="courses" element={<CourseManager />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="exams" element={<Exams />} />
          <Route path="fees" element={<Fees />} />
          <Route path="library" element={<Library />} />
          <Route path="events" element={<Events />} />
          {/* Add other routes here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
