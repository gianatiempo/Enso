import './index.css'
import 'antd/dist/reset.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConfigProvider } from 'antd'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import ErrorPage from './pages/ErrorPage'
import Layout from './pages/Root'
import WelcomePage from './pages/WelcomePage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60, //data is good for 1 hour
    },
  },
})

export type QueryClientType = typeof queryClient

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <WelcomePage /> },
          {
            path: 'contacts/:contactId',
            async lazy() {
              const { ContactPage } = await import('./pages/ContactPage')
              return { Component: ContactPage }
            },
          },
          {
            path: 'contacts/:contactId/edit',
            async lazy() {
              const { EditContactPage } = await import('./pages/EditContactPage')
              return { Component: EditContactPage }
            },
          },
        ],
      },
    ],
  },
])

function prepare() {
  if (import.meta.env.MODE === 'development') {
    import('./mocks/browser').then(({ worker }) => {
      worker.start()
    })
  }
  return Promise.resolve()
}

prepare().then(() => {
  createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#00b96b',
          },
        }}
      >
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
        </QueryClientProvider>
      </ConfigProvider>
    </StrictMode>,
  )
})
