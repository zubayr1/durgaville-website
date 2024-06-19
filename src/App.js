import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DashboardHome from './components/DashboardHome'
import DashboardEvents from './components/DashboardEvents'
import DashboardMembers from './components/DashboardMembers'
import DashboardAdmin from './components/DashboardAdmin'
import AdminPortal from './components/AdminPortal'
import AdminAddPost from './components/AdminAddPost'
import AdminAddEvent from './components/AdminAddEvent'
import AdminAddMember from './components/AdminAddMember'
import AdminEditPost from './components/AdminEditPost'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<DashboardHome />} />
          <Route exact path="/upcoming-events" element={<DashboardEvents />} />
          <Route exact path="/meet-the-team" element={<DashboardMembers />} />
          <Route exact path="/adminlogin" element={<DashboardAdmin />} />
          <Route exact path="/adminportal" element={<AdminPortal />} />
          <Route exact path="/adminaddpost" element={<AdminAddPost />} />
          <Route exact path="/adminaddevent" element={<AdminAddEvent />} />
          <Route exact path="/adminaddmember" element={<AdminAddMember />} />
          <Route exact path="/admineditpost" element={<AdminEditPost />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
