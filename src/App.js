import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardHome from "./components/DashboardHome";
import DashboardBoishakhi from "./components/DashboardBoishakhi";
import DashboardUpcomingEvents from "./components/DashboardUpcomingEvents";
import DashboardPastEvents from "./components/DashboardPastEvents";
import DashboardDurgapujo from "./components/DashboardDurgapujo";
import DashboardDurgapujo2025 from "./components/DashboardDurgapujo2025";
// import DashboardMembers from "./components/DashboardMembers";
import DashboardMagazine from "./components/DashboardMagazine";
import DashboardAdmin from "./components/DashboardAdmin";

import AdminPortal from "./components/adminComponents/AdminPortal";
import AdminAddPastEvent from "./components/adminComponents/AdminAddPastEvent";
import AdminAddUpcomingEvent from "./components/adminComponents/AdminAddUpcomingEvent";
import AdminAddMember from "./components/adminComponents/AdminAddMember";
import AdminAddGallery from "./components/adminComponents/AdminAddGallery";

import AdminEditPastEvent from "./components/adminComponents/AdminEditPastEvent";
import AdminEditUpcomingEvent from "./components/adminComponents/AdminEditUpcomingEvent";
import AdminEditMembers from "./components/adminComponents/AdminEditMembers";
import AdminEditGallery from "./components/adminComponents/AdminEditGallery";

import AdminCheckMagazineEntries from "./components/adminComponents/AdminCheckMagazineEntries";
import AdminBoishakhiOrders from "./components/adminComponents/AdminBoishakhiOrders";

import DataPrivacy from "./components/dataprivacy";
import Impressum from "./components/impressum";

import PageNotFound from "./components/PageNotFound";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<DashboardHome />} />
          <Route exact path="/pujo-2025" element={<DashboardDurgapujo2025 />} />
          <Route exact path="/pujo-2024" element={<DashboardDurgapujo />} />
          <Route exact path="/boishakhi-2025" element={<DashboardBoishakhi />} />
          <Route exact path="/upcoming-events" element={<DashboardUpcomingEvents />} />
          <Route exact path="/past-events" element={<DashboardPastEvents />} />
          {/* <Route exact path="/meet-the-team" element={<DashboardMembers />} />*/}
          <Route exact path="/magazine" element={<DashboardMagazine />} />

          <Route exact path="/adminlogin" element={<DashboardAdmin />} />
          <Route exact path="/adminportal" element={<AdminPortal />} />
          <Route exact path="/adminaddpastevent" element={<AdminAddPastEvent />} />
          <Route exact path="/adminaddupcomingevent" element={<AdminAddUpcomingEvent />} />
          <Route exact path="/adminaddmember" element={<AdminAddMember />} />
          <Route exact path="/adminaddgallery" element={<AdminAddGallery />} />

          <Route exact path="/admineditpastevent" element={<AdminEditPastEvent />} />
          <Route exact path="/admineditupcomingevent" element={<AdminEditUpcomingEvent />} />
          <Route exact path="/admineditmember" element={<AdminEditMembers />} />
          <Route exact path="/admineditgallery" element={<AdminEditGallery />} />

          <Route exact path="/admincheckmagazineentries" element={<AdminCheckMagazineEntries />} />

          <Route path="/admin/boishakhi-orders" element={<AdminBoishakhiOrders />} />

          <Route exact path="/dataprivacy" element={<DataPrivacy />} />
          <Route exact path="/impressum" element={<Impressum />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
