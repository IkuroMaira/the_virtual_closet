// On importe les outils de TanStack Query dont on a besoin
import { useMutation, useQueryClient } from "@tanstack/react-query";
// On importe la fonction qui l'appel API
import { updateClothing } from "../../../shared/services/clothes_api";

export const useUpdateClothing = () => {
  // useQueryClientdonne accès au "cache de TanStack Query
  // C'est lui qui stocke toutes les données déjà récupérées
  const queryClient = useQueryClient();

  // useMutationsert pour les operation qui MODIFIENT des données
  // (POST, PUT, PATCH, DELTE) - à l'opposé de useQuery qui lit des données
  const { isPending, isError, mutate, error } = useMutation({
    // mutationFn: la fonction à appeler quand on déclenche la mutation (la modification)
    // Elle recevra automatiquement l'argument passé à mutate(...)
    mutationFn: updateClothing,
    //  onSuccess se déclenche si mutationFn a réussi
    // - data; ce que la fonction a retourné
    // - variables: l'argument qu'on avait passé à mutate(...)
    onSuccess: () => {
      //  On invalide le cache pour forcé un re-fetch des données fraîches
      // variables.id = l'id du vêtement qu'on vient de modifier
      // Sans ça, l'UI afficherait encore les anciennes données
      queryClient.invalidateQueries({
        queryKey: ["clothing", id]
      });
    },
  });

  // On expose ce dont les composanbrs ont besoin:
  // - mutate: la fonction à appeler pour déclencher la mise à jour
  // - isPending: true pendant que l'appel API est en cours
  // - isError: true si l'appel a échoué
  // - error: le détail de l'erreur
  return {
    isPending,
    isError,
    mutate,
    error,
  };
};
