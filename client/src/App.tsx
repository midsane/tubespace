import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux'
import { store } from './store/store'
import { HomeScreen } from './screens/homescreen'
import {  WorkSpacesScreen } from './screens/workspacesScreen'
import { ChatScreen } from './screens/chatScreen'
import { SettingScreen } from './screens/settingScreen'
import { CreateScreen } from './screens/createScreen'
import { LandingPage } from './screens/landingpage'
import { RootLayout } from './screens/rootlayout'
import { Modal } from "./components/Modal"

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


