import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './layouts/rootLayout/RootLayout.tsx'
import DashboardPage from './pages/dashboardPage/DashboardPage.tsx'
import ChatPage from './pages/chatPage/ChatPage.tsx'
import AuthLayout from './layouts/authLayout/AuthLayout.tsx'
import SignInPage from './pages/signInPage/SignInPage.tsx'
import SignUpPage from './pages/signUpPage/SignUpPage.tsx'

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <DashboardPage />
      },
      {
        path: '/chat/:id',
        element: <ChatPage />
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/sign-in',
        element: <SignInPage />
      },
      {
        path: '/sign-up',
        element: <SignUpPage />
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
