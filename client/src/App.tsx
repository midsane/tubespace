import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux'
import { store } from './store/store'

import { RootLayout } from './Screens/AdminScreens/rootlayout'
import { LandingPage } from './Screens/landingpage'
import { HomeScreen } from './Screens/AdminScreens/homescreen'
import { WorkSpacesScreen } from './Screens/AdminScreens/workspacesScreen'
import { ChatScreen } from './Screens/AdminScreens/chatScreen'
import { CreateScreen } from './Screens/AdminScreens/createScreen'
import { SettingScreen } from './Screens/AdminScreens/settingScreen'
import { CollaboratorsScreen } from './Screens/AdminScreens/collaboratorsScreen'
import { HomeScreenCol } from './Screens/collaboratorScreen/homeScreen'
import { SettingScreenCol } from './Screens/collaboratorScreen/settingScreen'
import { YoutuberScreen } from './Screens/collaboratorScreen/youtubersScreen'
import { linkType } from './components/ScreenWrapper'
import { UnAuthorzedPage } from './components/MidErrorPages/unauthorized'
import { ErrorPage } from './components/MidErrorPages/errorPage'
import { NotFoundPage } from './components/MidErrorPages/notFound'
import { LogoutPage } from './Screens/logoutPage'
import { createRouteLoader, workspaceRouteLoader } from './routeMiddlewares/loader'
import { AdminParent } from './Screens/AdminScreens/Adminparent'
import { CollabParent } from './Screens/collabParent'
import { ChatParent } from './Screens/chatParent'


const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <RootLayout />,
    children: [
      {
        index: true, element: <LandingPage />
      },
      {
        path: "/logout", element: <LogoutPage />
      },
      {
        path: "*",
        element: <NotFoundPage />
      },
      {
        path: "unauthorized", element: <UnAuthorzedPage />
      },

      {
        path: "y/:username/",
        element: <AdminParent />,
        children: [
          {
            path: "home", element: <HomeScreen />,
          },
          {
            path: "Workspaces", loader: workspaceRouteLoader, children: [
              {
                index: true, element: <WorkSpacesScreen />
              },
              {
                path: ":workspaceName",
                element: <WorkSpacesScreen />
              }
            ]
          },
          {
            path: "chat", element: <ChatParent />
          },
          {
            path: "chat/:username", element: <ChatScreen linkType={linkType.one} />
          },
          {
            path: "create",
            children: [
              {
                index: true, element: <CreateScreen />
              },
              {
                path: ":draftName",
                element: <CreateScreen />
              }
            ]
          },

          {
            path: "settings", element: <SettingScreen type={1} />
          },
          {
            path: "Collaborators", element: <CollaboratorsScreen />
          }
        ]

      },

      {
        path: "c/:username/",
        element: <CollabParent />,
        children: [
          {
            path: "home", element: <HomeScreenCol />,
          },

          {
            path: "chat", element: <ChatParent />
          },
          {
            path: "chat/:username", element: <ChatScreen linkType={linkType.two} />
          },
          {
            path: "create",
            loader: createRouteLoader,
            children: [
              {
                path: ":draftName",
                element: <CreateScreen />
              }
            ]
          },

          {
            path: "settings", element: <SettingScreenCol type={2} />
          },
          {
            path: "Youtubers", element: <YoutuberScreen />
          }
        ]
      }

    ]
  }
])

function App() {

  return (
    <Provider store={store}>
      <RouterProvider router={router}>
      </RouterProvider>
    </Provider>
  )
}

export default App




