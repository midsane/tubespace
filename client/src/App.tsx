import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux'
import { store } from './store/store'
import { HomeScreen } from './screens/homescreen'
import { CollabScreen } from './screens/collabScreen'
import { ChatScreen } from './screens/chatScreen'
import { SettingScreen } from './screens/settingScreen'
import { CreateScreen } from './screens/createScreen'
import { LandingPage } from './screens/landingpage'
import { RootLayout } from './screens/rootlayout'

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
        path: "/collab", element: <CollabScreen />
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
      <RouterProvider router={router}>
      </RouterProvider>
    </Provider>


  )
}

export default App


