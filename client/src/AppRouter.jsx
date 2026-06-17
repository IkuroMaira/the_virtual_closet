import { RouterProvider, createRouter } from '@tanstack/react-router'
import { useAuth } from '@/shared/context/useAuth'
import { routeTree } from './routeTree.gen'

export function AppRouter() {
    const auth = useAuth()
    const router = createRouter({ routeTree, context: { auth } })
    return <RouterProvider router={router} />
}
