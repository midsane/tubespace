import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux'
import { store } from './store/store'
import { HomeScreen } from './Screens/homescreen'
import {  WorkSpacesScreen } from './Screens/workspacesScreen'
import { ChatScreen } from './Screens/chatScreen'
import { SettingScreen } from './Screens/settingScreen'
import { CreateScreen } from './Screens/createScreen'
import { LandingPage } from './Screens/landingpage'
import { RootLayout } from './Screens/rootlayout'
import { Modal } from "./components/Modal"
import { CollaboratorsScreen } from './Screens/collaboratorsScreen'

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


