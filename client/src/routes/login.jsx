import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import LoginForm from '@/features/auth/components/LoginForm'
import { useAuth } from '@/shared/context/useAuth'

export const Route = createFileRoute('/login')({
    component: LoginPage,
})

function LoginPage() {
    const { session } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (session) navigate({ to: '/' })
    }, [session])

    return (
        <div className="mx-auto max-w-sm pt-16">
            <h1 className="text-2xl font-bold mb-6 text-center">Connexion</h1>
            <LoginForm />
        </div>
    )
}
