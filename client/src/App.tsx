import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { LandingPage } from './components/landingpage/landingpage'
const router = createBrowserRouter([
  {
    path: "/",
    element:  <LandingPage />,
    children: [
      {
        index: true,
        element: <LandingPage />
      },
      {
        path: "profile/:userid",
        element: <>profilepage</>
      },
      {
        path: "task",
        element: <>tasks</>
      },
      {
        path: "notifications",
        element: <>notifications</>
      },
    ]
  }
])

function App() {

  return (
    <RouterProvider router={router}>
    </RouterProvider>
  )
}

export default App