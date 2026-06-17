import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link } from '@tanstack/react-router'
import { toast } from 'sonner'
import { supabase } from '@/shared/services/supabaseClient'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const loginSchema = z.object({
    email: z.string().email('Email invalide'),
    password: z.string().min(1, 'Mot de passe requis'),
})

export default function LoginForm() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(loginSchema),
    })

    async function onSubmit({ email, password }) {
        const { error } = await supabase.auth.signInWithPassword({ email, password })

        if (error) {
            toast.error(error.message)
            return
        }
        // La navigation est gérée dans LoginPage via useEffect sur la session
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div>
                <label className="text-sm font-medium">Email</label>
                <Input type="email" placeholder="ton@email.com" {...register('email')} />
                {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
                <label className="text-sm font-medium">Mot de passe</label>
                <Input type="password" placeholder="Ton mot de passe" {...register('password')} />
                {errors.password && <p className="text-destructive text-xs mt-1">{errors.password.message}</p>}
            </div>

            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Connexion...' : 'Se connecter'}
            </Button>

            <p className="text-sm text-center text-muted-foreground">
                Pas encore de compte ?{' '}
                <Link to="/register" className="underline text-foreground">S&apos;inscrire</Link>
            </p>
        </form>
    )
}
