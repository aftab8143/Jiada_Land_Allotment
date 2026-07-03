import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import LandingPage from '../pages/Landing';
import LoginPage from '../pages/Auth/Login';
import RegisterPage from '../pages/Auth/Register';
import ApplicantDashboard from '../pages/Dashboard/ApplicantDashboard';
import ProfilePage from '../pages/Profile';

import PlotSearch from '../pages/LandBank/PlotSearch';
import PlotDetail from '../pages/LandBank/PlotDetail';
import Wishlist from '../pages/LandBank/Wishlist';

import ApplicationList from '../pages/Application/ApplicationList';
import ApplicationDetail from '../pages/Application/ApplicationDetail';
import NewApplication from '../pages/Application/NewApplication';

import CCScrutiny from '../pages/Workflow/CCScrutiny';
import IEOVerification from '../pages/Workflow/IEOVerification';
import DORDDScrutiny from '../pages/Workflow/DORDDScrutiny';
import RDApproval from '../pages/Workflow/RDApproval';

import BidEvent from '../pages/Bidding/BidEvent';
import BidSubmission from '../pages/Bidding/BidSubmission';

import PaymentGateway from '../pages/Payments/PaymentGateway';
import PaymentHistory from '../pages/Payments/PaymentHistory';
import DemandLetter from '../pages/Payments/DemandLetter';

import DocumentsPage from '../pages/Documents';
import NotificationsPage from '../pages/Notifications';

import MISOverview from '../pages/MIS/Overview';
import ApplicationReport from '../pages/MIS/ApplicationReport';
import RevenueReport from '../pages/MIS/RevenueReport';
import LandBankReport from '../pages/MIS/LandBankReport';

import MasterData from '../pages/Admin/MasterData';
import UserManagement from '../pages/Admin/UserManagement';
import PlotNotification from '../pages/Admin/PlotNotification';

import Surrender from '../pages/PostAllotment/Surrender';
import Mortgage from '../pages/PostAllotment/Mortgage';
import Transfer from '../pages/PostAllotment/Transfer';
import Renewal from '../pages/PostAllotment/Renewal';

import Showcase from '../pages/Showcase';
import UIDemo from '../pages/UIDemo';
import AdminDashboard from '../pages/Dashboard/AdminDashboard';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

const AppRoutes = () => (
  <Routes>
    {/* Public */}
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<RegisterPage />} />

    {/* Authenticated */}
    <Route path="/dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
    <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />

    <Route path="/land-bank" element={<PrivateRoute><PlotSearch /></PrivateRoute>} />
    <Route path="/land-bank/:plotId" element={<PrivateRoute><PlotDetail /></PrivateRoute>} />
    <Route path="/land-bank/wishlist" element={<PrivateRoute><Wishlist /></PrivateRoute>} />

    <Route path="/applications" element={<PrivateRoute><ApplicationList /></PrivateRoute>} />
    <Route path="/applications/new" element={<PrivateRoute><NewApplication /></PrivateRoute>} />
    <Route path="/applications/:id" element={<PrivateRoute><ApplicationDetail /></PrivateRoute>} />

    <Route path="/workflow/cc" element={<PrivateRoute><CCScrutiny /></PrivateRoute>} />
    <Route path="/workflow/ieo" element={<PrivateRoute><IEOVerification /></PrivateRoute>} />
    <Route path="/workflow/do-rdd" element={<PrivateRoute><DORDDScrutiny /></PrivateRoute>} />
    <Route path="/workflow/rd" element={<PrivateRoute><RDApproval /></PrivateRoute>} />

    <Route path="/bidding" element={<PrivateRoute><BidEvent /></PrivateRoute>} />
    <Route path="/bidding/:eventId/submit" element={<PrivateRoute><BidSubmission /></PrivateRoute>} />

    <Route path="/payments" element={<PrivateRoute><PaymentHistory /></PrivateRoute>} />
    <Route path="/payments/gateway" element={<PrivateRoute><PaymentGateway /></PrivateRoute>} />
    <Route path="/payments/demand-letter/:applicationId" element={<PrivateRoute><DemandLetter /></PrivateRoute>} />

    <Route path="/documents" element={<PrivateRoute><DocumentsPage /></PrivateRoute>} />
    <Route path="/notifications" element={<PrivateRoute><NotificationsPage /></PrivateRoute>} />

    <Route path="/mis" element={<PrivateRoute><MISOverview /></PrivateRoute>} />
    <Route path="/mis/applications" element={<PrivateRoute><ApplicationReport /></PrivateRoute>} />
    <Route path="/mis/revenue" element={<PrivateRoute><RevenueReport /></PrivateRoute>} />
    <Route path="/mis/land-bank" element={<PrivateRoute><LandBankReport /></PrivateRoute>} />

    <Route path="/admin/master-data" element={<PrivateRoute><MasterData /></PrivateRoute>} />
    <Route path="/admin/users" element={<PrivateRoute><UserManagement /></PrivateRoute>} />
    <Route path="/admin/plot-notifications" element={<PrivateRoute><PlotNotification /></PrivateRoute>} />

    <Route path="/post-allotment/surrender" element={<PrivateRoute><Surrender /></PrivateRoute>} />
    <Route path="/post-allotment/mortgage" element={<PrivateRoute><Mortgage /></PrivateRoute>} />
    <Route path="/post-allotment/transfer" element={<PrivateRoute><Transfer /></PrivateRoute>} />
    <Route path="/post-allotment/renewal" element={<PrivateRoute><Renewal /></PrivateRoute>} />

    <Route path="/showcase" element={<Showcase />} />
    <Route path="/uidemo" element={<UIDemo />} />

    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoutes;
