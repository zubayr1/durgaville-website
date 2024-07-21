import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DashboardHome from './components/DashboardHome'
import DashboardEvents from './components/DashboardEvents'
import DashboardMembers from './components/DashboardMembers'
import DashboardAdmin from './components/DashboardAdmin'
import AdminPortal from './components/AdminPortal'
import AdminAddPost from './components/AdminAddPost'
import AdminAddEvent from './components/AdminAddEvent'
import AdminAddMember from './components/AdminAddMember'
import AdminAddGallery from './components/AdminAddGallery'
import AdminEditPost from './components/AdminEditPost'
import AdminEditEvent from './components/AdminEditEvent'
import AdminEditMembers from './components/AdminEditMembers'
import AdminEditGallery from './components/AdminEditGallery'
import DashboardMagazine from './components/DashboardMagazine'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<DashboardHome />} />
          <Route exact path="/upcoming-events" element={<DashboardEvents />} />
          <Route exact path="/meet-the-team" element={<DashboardMembers />} />
          <Route exact path="/magazine" element={<DashboardMagazine />} />

          <Route exact path="/adminlogin" element={<DashboardAdmin />} />
          <Route exact path="/adminportal" element={<AdminPortal />} />
          <Route exact path="/adminaddpost" element={<AdminAddPost />} />
          <Route exact path="/adminaddevent" element={<AdminAddEvent />} />
          <Route exact path="/adminaddmember" element={<AdminAddMember />} />
          <Route exact path="/adminaddgallery" element={<AdminAddGallery />} />
          
          <Route exact path="/admineditpost" element={<AdminEditPost />} />
          <Route exact path="/admineditevent" element={<AdminEditEvent />} />
          <Route exact path="/admineditmember" element={<AdminEditMembers />} />
          <Route exact path="/admineditgallery" element={<AdminEditGallery />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
