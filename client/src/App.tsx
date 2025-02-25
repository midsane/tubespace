import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux'
import { store } from './store/store'

import { Modal } from "./components/Modal"

import { RootLayout } from './Screens/AdminScreens/rootlayout'
import { LandingPage } from './Screens/AdminScreens/landingpage'
import { HomeScreen } from './Screens/AdminScreens/homescreen'
import { WorkSpacesScreen } from './Screens/AdminScreens/workspacesScreen'
import { ChatScreen } from './Screens/AdminScreens/chatScreen'
import { CreateScreen } from './Screens/AdminScreens/createScreen'
import { SettingScreen } from './Screens/AdminScreens/settingScreen'
import { CollaboratorsScreen } from './Screens/AdminScreens/collaboratorsScreen'
import { HomeScreenCol } from './Screens/collaboratorScreen/homeScreen'
import { SettingScreenCol } from './Screens/collaboratorScreen/settingScreen'

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true, element: <LandingPage />
      },
      {
        path: "/home", element: <HomeScreen />
      },
      {
        path: "/office", element: <WorkSpacesScreen />
      },
      {
        path: "/chat", element: <ChatScreen />
      },
      {
        path: "/create", element: <CreateScreen />
      },
      {
        path: "/settings", element: <SettingScreen />
      },
      {
        path: "/Collaborators", element: <CollaboratorsScreen />
      }
      ,


      {
        path: "col/:colId/home", element: <HomeScreenCol />
      },
      {
        path: "col/:colId/Settings", element: <SettingScreenCol />
      },

    ]
  }
])

function App() {

  return (
    <Provider store={store}>
      <Modal />
      <RouterProvider router={router}>
      </RouterProvider>
    </Provider>
  )
}

export default App


