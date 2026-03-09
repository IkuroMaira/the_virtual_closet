import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import Header from '../layouts/Header'

// __root.jsx est le layout principal qui englobe toutes les routes
export const Route = createRootRoute({
    component: RootComponent,
})

function RootComponent() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />

            <main className="mx-auto max-w-7xl px-4 py-6">
                {/* Outlet affiche le contenu de la route active */}
                <Outlet />
            </main>

            {/* Devtools visible uniquement en développement */}
            <TanStackRouterDevtools initialIsOpen={false} />
        </div>
    )
}
