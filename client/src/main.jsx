import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider, useAuth } from '@/shared/context/AuthContext'
import './index.css'

import { routeTree } from './routeTree.gen'

const queryClient = new QueryClient()

function AppRouter() {
    const auth = useAuth()
    const router = createRouter({ routeTree, context: { auth } })
    return <RouterProvider router={router} />
}

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <AppRouter />
            </AuthProvider>
        </QueryClientProvider>
    </StrictMode>,
)
