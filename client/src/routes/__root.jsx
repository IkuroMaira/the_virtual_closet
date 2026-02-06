import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import '../App.css'

// __root.jsx est le layout principal qui englobe toutes les routes
export const Route = createRootRoute({
    component: RootComponent,
})

function RootComponent() {
    return (
        <>
            <h1>The Virtual Closet</h1>

            {/* Outlet affiche le contenu de la route active */}
            <Outlet />

            {/* Devtools visible uniquement en développement */}
            <TanStackRouterDevtools initialIsOpen={false} />
        </>
    )
}
