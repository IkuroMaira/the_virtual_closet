import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { supabase } from '@/shared/services/supabaseClient'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const registerSchema = z.object({
    email: z.string().email('Email invalide'),
    password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword'],
})

export default function RegisterForm() {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(registerSchema),
    })

    async function onSubmit({ email, password }) {
        const { error } = await supabase.auth.signUp({ email, password })

        if (error) {
            toast.error(error.message)
            return
        }

        toast.success('Inscription réussie ! Confirme ton email avant de te connecter.')
        navigate({ to: '/login' })
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
                <Input type="password" placeholder="8 caractères minimum" {...register('password')} />
                {errors.password && <p className="text-destructive text-xs mt-1">{errors.password.message}</p>}
            </div>

            <div>
                <label className="text-sm font-medium">Confirmer le mot de passe</label>
                <Input type="password" placeholder="Répète ton mot de passe" {...register('confirmPassword')} />
                {errors.confirmPassword && <p className="text-destructive text-xs mt-1">{errors.confirmPassword.message}</p>}
            </div>

            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Inscription...' : "S'inscrire"}
            </Button>
        </form>
    )
}
