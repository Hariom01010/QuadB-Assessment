import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Show from "./routes/Show.jsx"
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path:"/",
    element: <App />,
  },
  {
    path:'/shows/:showId',
    element: <Show />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
