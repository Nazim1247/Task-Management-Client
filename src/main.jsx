// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
   
//     <App />
    
//   </StrictMode>
// )

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import router from './routs/Route.jsx'
// import { RouterProvider } from 'react-router-dom'
// import AuthProvider from './provider/AuthProvider.jsx'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import router from './routes/Router.jsx'
import AuthProvider from './components/AuthProvider.jsx'
import { RouterProvider } from 'react-router'

const queryClient = new QueryClient()
// const queryClient = new QueryClient({
//   defaultOptions: {
//       queries: {
//           staleTime: 0, // সব query-র জন্য default ভাবে staleTime 0 সেট হবে
//       },
//   },
// });

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <DndProvider backend={HTML5Backend}>
        <RouterProvider router={router}></RouterProvider>
        </DndProvider>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
)