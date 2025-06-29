import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { LandingPage } from './components/landingpage/landingpage'
import { RootLayout } from './pages/rootlayout'
import { ProfilePage } from './pages/profilePage'
import { TaskPage } from './pages/taskPage'
import { NotificationPage } from './pages/notificationPage'
import { MessagesPage } from './pages/messagePage'
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "tasks",
        element: <TaskPage />
      },
      {
        path: "profile/:username",
        element: <ProfilePage />
      },
      {
        path: "messages",
        element: <MessagesPage />
      },
      {
        path: "notifications",
        element: <NotificationPage />
      },
    ],
  }
])


function App() {

  return (
    <RouterProvider router={router}>
    </RouterProvider>
  )
}

export default App