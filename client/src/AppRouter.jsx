import { RouterProvider, createRouter } from '@tanstack/react-router'
import { useMemo } from 'react'
import { useAuth } from '@/shared/context/useAuth'
import { routeTree } from './routeTree.gen'

export function AppRouter() {
    const auth = useAuth()
    const router = useMemo(() => createRouter({ routeTree, context: { auth } }), [])
    return <RouterProvider router={router} context={{ auth }} />
}
