import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { RootLayout } from './pages/rootlayout'
import { ProfilePage } from './pages/profilePage'
import { TaskPage } from './pages/taskPage'
import { NotificationPage } from './pages/notificationPage'
import { MessagesPage } from './pages/messagePage'
import { AuthPage } from './components/pagesUi/authPage/authPage'
import { RootPageLayout } from './components/landingpage/rootPageLayout'
import { LandingPage } from './components/landingpage/landingpage'
import { VideoPreviewPage } from './pages/videoPreviewPage'
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPageLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />
      },

      {
        path: "auth",
        element: <AuthPage />
      },
      {
        path: "oauth",
        element: <>OAuth</>
      },
      {
        path: "video-preview/:taskId",
        element: <VideoPreviewPage />
      }
    ]
  },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "y/tasks",
        element: <TaskPage />
      },
      {
        path: "y/profile/:username",
        element: <ProfilePage />
      },
      {
        path: "y/messages",
        element: <MessagesPage />
      },
      {
        path: "y/notifications",
        element: <NotificationPage />
      }, {
        path: "c/tasks",
        element: <TaskPage />
      },
      {
        path: "c/profile/:username",
        element: <ProfilePage />
      },
      {
        path: "c/messages",
        element: <MessagesPage />
      },
      {
        path: "c/notifications",
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