import { createFileRoute } from '@tanstack/react-router'
import LoginForm from '@/features/auth/components/LoginForm'

export const Route = createFileRoute('/login')({
    component: LoginPage,
})

function LoginPage() {
    return (
        <div className="mx-auto max-w-sm pt-16">
            <h1 className="text-2xl font-bold mb-6 text-center">Connexion</h1>
            <LoginForm />
        </div>
    )
}
