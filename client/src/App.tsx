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
import { OAuthPage } from './components/pagesUi/authPage/OAuthPage'
import { TaskUpdatePage } from './pages/taskUpdatePage'
import { YtOAuthPage } from './components/pagesUi/yt-upload/Oauth'
import { CheckProgressPage } from './pages/checkProgressPage'
import { PricingPage } from './pages/staticPages/pricingPage'
import { WorkingPage } from './pages/staticPages/workingPage'
import { PrivacyPolicyPage } from './pages/staticPages/privacyPolicyPage'
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
        path: "pricing",
        element: <PricingPage />
      },
      {
        path: "what-we-solve",
        element: <WorkingPage />
      },
      {
        path: "working",
        element: <WorkingPage />
      },
      {
        path: "privacy",
        element: <PrivacyPolicyPage />
      },
      {
        path: "auth",
        element: <AuthPage />
      },
      {
        path: "oauth",
        element: <OAuthPage />
      },
      {
        path: "yt-upload",
        element: <YtOAuthPage />
      },
      {
        path: "video-preview/:taskId",
        element: <VideoPreviewPage />
      },
      {
        path: "task-update/:taskId",
        element: <TaskUpdatePage />
      },
      {
        path: "check-progress/:taskId",
        element: <CheckProgressPage />
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