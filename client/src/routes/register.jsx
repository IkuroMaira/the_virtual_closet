import { createFileRoute } from '@tanstack/react-router'
import RegisterForm from '@/features/auth/components/RegisterForm'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/register')({
    component: RegisterPage,
})

function RegisterPage() {
    return (
        <div className="mx-auto max-w-sm pt-16">
            <h1 className="text-2xl font-bold mb-6 text-center">Inscription</h1>
            <RegisterForm />
            <p className="text-sm text-center text-muted-foreground mt-4">
                Déjà un compte ?{' '}
                <Link to="/login" className="underline text-foreground">Se connecter</Link>
            </p>
        </div>
    )
}
