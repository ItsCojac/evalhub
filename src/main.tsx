import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import App from './App';
import { Login } from './pages/Login';
import { Profile } from './pages/Profile';
import { CreateList } from './pages/CreateList';
import { ListDetail } from './pages/ListDetail';
import { ErrorBoundary } from './components/ErrorBoundary';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import './index.css';

try {
  const router = createBrowserRouter([
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <App />
        </ProtectedRoute>
      ),
      errorElement: <ErrorBoundary><App /></ErrorBoundary>,
    },
    {
      path: '/profile',
      element: (
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      ),
    },
    {
      path: '/lists/new',
      element: (
        <ProtectedRoute>
          <CreateList />
        </ProtectedRoute>
      ),
      errorElement: <ErrorBoundary><CreateList /></ErrorBoundary>,
    },
    {
      path: '/lists/:id',
      element: (
        <ProtectedRoute>
          <ListDetail />
        </ProtectedRoute>
      ),
      errorElement: <ErrorBoundary><ListDetail /></ErrorBoundary>,
    },
  ]);

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <ErrorBoundary>
        <AuthProvider>
          <RouterProvider router={router} />
          <Toaster position="top-right" />
        </AuthProvider>
      </ErrorBoundary>
    </StrictMode>
  );
} catch (error) {
  console.error('Failed to initialize application:', error);
  const root = document.getElementById('root');
  if (root) {
    createRoot(root).render(
      <StrictMode>
        <ErrorBoundary>
          <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Initialization Error</h2>
              <p className="text-gray-600 mb-6">
                The application failed to initialize. Please check your configuration and try again.
              </p>
            </div>
          </div>
        </ErrorBoundary>
      </StrictMode>
    );
  }
}