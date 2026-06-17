import { useContext } from 'react'
import { AuthContext } from '@/shared/context/auth-context'

export function useAuth() {
    return useContext(AuthContext)
}
