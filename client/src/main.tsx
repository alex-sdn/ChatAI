import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './layouts/RootLayout.tsx'
import DashboardPage from './pages/DashboardPage.tsx'
import ChatPage from './pages/ChatPage.tsx'
import AuthLayout from './layouts/AuthLayout.tsx'
import AuthPage from './pages/AuthPage.tsx'
import AuthGuard from './guards/AuthGuard.tsx'
import GuestGuard from './guards/GuestGuard.tsx'

const router = createBrowserRouter([
  {
    element: <AuthGuard />,
    children: [
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
      }
    ]
  },
  {
    element: <GuestGuard />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: '/sign-in',
            element: <AuthPage type="sign-in"/>
          },
          {
            path: '/sign-up',
            element: <AuthPage type="sign-up"/>
          }
        ]
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <RouterProvider router={router} />
  // </StrictMode>,
)
