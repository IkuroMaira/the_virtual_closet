import { Link, useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/shared/context/AuthContext'

export default function Header() {
    const { session, signOut } = useAuth()
    const navigate = useNavigate()

    async function handleSignOut() {
        await signOut()
        navigate({ to: '/login' })
    }

    return (
        <header className="border-b bg-background">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
                <Link to="/" className="text-xl font-bold tracking-tight text-foreground no-underline">
                    The Virtual Closet
                </Link>

                <nav className="flex items-center gap-2">
                    {session && (
                        <>
                            <Button variant="ghost" asChild>
                                <Link to="/">Catalogue</Link>
                            </Button>
                            <Button variant="ghost" asChild>
                                <Link to="/tags">Tags</Link>
                            </Button>
                            <Button variant="outline" onClick={handleSignOut}>
                                Se déconnecter
                            </Button>
                        </>
                    )}
                </nav>
            </div>
        </header>
    )
}
