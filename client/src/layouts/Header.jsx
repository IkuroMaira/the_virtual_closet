import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export default function Header() {
    return (
        <header className="border-b bg-background">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
                <Link to="/" className="text-xl font-bold tracking-tight text-foreground no-underline">
                    The Virtual Closet
                </Link>

                <nav className="flex items-center gap-2">
                    <Button variant="ghost" asChild>
                        <Link to="/">Catalogue</Link>
                    </Button>
                    <Button variant="ghost" asChild>
                        <Link to="/tags">Tags</Link>
                    </Button>
                </nav>
            </div>
        </header>
    )
}
