import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import AppRoutes from './router';

const App = () => (
  <BrowserRouter> {/* enables page navigation (URLs like /dashboard) */}
    <AuthProvider> {/* holds "is the user logged in?" for everyone */}
      <NotificationProvider> {/* holds notifications for everyone */}
        <AppRoutes /> {/* the actual pages */}
      </NotificationProvider>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
