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
import { YTGetAccessToken } from './components/pagesUi/yt-upload/YTGetAccessToken'
import { CheckProgressPage } from './pages/checkProgressPage'
import { PricingPage } from './pages/staticPages/pricingPage'
import { WorkingPage } from './pages/staticPages/workingPage'
import { PrivacyPolicyPage } from './pages/staticPages/privacyPolicyPage'
import { VerifyOTPPage } from './components/pagesUi/authPage/verifyOtp'
import { ResetPasswordPage } from './components/pagesUi/authPage/resetPassword'
import { TNC } from './pages/staticPages/termsAndConditionsPage'
import { YTStartUploadSession } from './components/pagesUi/yt-upload/StartUploadSession'
const router = createBrowserRouter([

  {
    path: "privacy",
    element: <PrivacyPolicyPage />
  },
  {
    path: "terms-and-conditions",
    element: <TNC />
  },
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
        path: "auth",
        element: <AuthPage />,
      },
      {
        path: "auth/verify-otp",
        element: <VerifyOTPPage />
      },
      {
        path: "auth/reset-password",
        element: <ResetPasswordPage />
      },
      {
        path: "oauth",
        element: <OAuthPage />
      },
      {
        path: "yt-upload",
        element: <YTGetAccessToken />
      },
      {
        path: "yt-startUpload",
        element: <YTStartUploadSession />
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