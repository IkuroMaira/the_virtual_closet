import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { useForm, Controller } from "react-hook-form"
import { useEnums } from "../hooks/useEnums"
import { uploadClothingPicture } from "@/shared/services/clothes_api"
import { supabase } from "@/shared/services/supabaseClient"

const schema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères.").max(50, "Le nom ne peut pas dépasser 50 caractères."),
  category: z.string().min(1, "La catégorie est obligatoire."),
  color: z.string().min(1, "La couleur est obligatoire."),
  size: z.string().optional(),
  status: z.string().optional(),
  style: z.string().optional(),
  season: z.string().optional(),
  materials: z.string().optional(),
  note: z.coerce.number({ invalid_type_error: "La note doit être un nombre." }).int("La note doit être un nombre entier.").min(1, "La note minimum est 1.").max(5, "La note maximum est 5.").optional().or(z.literal("")),
  comment: z.string().optional(),
})

const toFormValues = (data) => {
  if (!data) return { name: '', category: '', color: '' }
  return Object.fromEntries(
    Object.entries(data).map(([k, v]) => {
      if (k === 'note') return [k, v != null ? String(v) : '']
      return [k, v ?? undefined]
    })
  )
}

export default function ClothingForm({ onSubmit, clothingData }) {
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: toFormValues(clothingData),
  })

  const { data: enums } = useEnums()
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(clothingData?.picture ?? null)
  const [uploadError, setUploadError] = useState(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setSelectedFile(file)
    setPreviewUrl(URL.createObjectURL(file))
    setUploadError(null)
  }

  const handleFormSubmit = async (data) => {
    const cleaned = Object.fromEntries(
      Object.entries(data).filter(([, v]) => v !== '')
    )

    if (selectedFile) {
      setIsUploading(true)
      try {
        const { data: { user } } = await supabase.auth.getUser()
        const pictureUrl = await uploadClothingPicture(selectedFile, user.id)
        cleaned.picture = pictureUrl
      } catch (err) {
        setUploadError("Impossible d'uploader la photo. Réessayez.")
        setIsUploading(false)
        return
      }
      setIsUploading(false)
    }

    onSubmit(cleaned)
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <FieldGroup>
          <Field className="w-full max-w-100">
            <FieldLabel htmlFor="name">Nom<span className="text-destructive">*</span></FieldLabel>
            <Input
              id="name"
              placeholder="Quel petit nom ?"
              {...register("name")}
            />
            {errors.name && <p className="text-destructive text-xs mt-1">{errors.name.message}</p>}
          </Field>

          <Field className="w-full max-w-100">
            <FieldLabel htmlFor="picture">Photo</FieldLabel>
            <Input
              id="picture"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Aperçu"
                className="mt-2 h-32 w-32 rounded-md object-cover"
              />
            )}
            {uploadError && <p className="text-destructive text-xs mt-1">{uploadError}</p>}
          </Field>

          <Field>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <FieldLabel>Catégories<span className="text-destructive">*</span></FieldLabel>
                  <SelectTrigger className="w-full max-w-100">
                    <SelectValue placeholder="Choisissez la catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Catégories</SelectLabel>
                      {
                        enums?.CategoryEnum?.map(item =>
                          <SelectItem value={item} key={item}   >{item}</SelectItem>
                        )
                      }
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category && <p className="text-destructive text-xs mt-1">{errors.category.message}</p>}
          </Field>

          <FieldGroup className="grid max-w-100 grid-cols-2">
            <Field>
              <Controller
                name="color"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FieldLabel>Couleurs<span className="text-destructive">*</span></FieldLabel>
                    <SelectTrigger className="w-full max-w-100">
                      <SelectValue placeholder="Choisissez la couleur" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Couleurs</SelectLabel>
                        {
                          enums?.ColorEnum?.map(item =>
                            <SelectItem value={item} key={item}>{item}</SelectItem>
                          )
                        }
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.color && <p className="text-destructive text-xs mt-1">{errors.color.message}</p>}
            </Field>

            <Field>
              <Controller
                name="size"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FieldLabel>Taille</FieldLabel>
                    <SelectTrigger className="w-full max-w-100">
                      <SelectValue placeholder="Choisissez la taille" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Taille</SelectLabel>
                        {
                          enums?.SizeEnum?.map(item =>
                            <SelectItem value={item} key={item}>{item}</SelectItem>
                          )
                        }
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>
          </FieldGroup>

          <FieldGroup className="grid max-w-100 grid-cols-2">
            <Field>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FieldLabel>Statut</FieldLabel>
                    <SelectTrigger className="w-full max-w-100">
                      <SelectValue placeholder="Choisissez le statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Statut</SelectLabel>
                        {
                          enums?.StatusEnum?.map(item =>
                            <SelectItem value={item} key={item}>{item}</SelectItem>
                          )
                        }
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>

            <Field>
              <Controller
                name="style"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FieldLabel>Style</FieldLabel>
                    <SelectTrigger className="w-full max-w-100">
                      <SelectValue placeholder="Choisissez le style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Style</SelectLabel>
                        {
                          enums?.StyleEnum?.map(item =>
                            <SelectItem value={item} key={item}>{item}</SelectItem>
                          )
                        }
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>
          </FieldGroup>

          <FieldGroup className="grid max-w-100 grid-cols-2">
            <Field>
              <Controller
                name="season"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FieldLabel>Saison</FieldLabel>
                    <SelectTrigger className="w-full max-w-100">
                      <SelectValue placeholder="Choisissez la saison" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Saison</SelectLabel>
                        {
                          enums?.SeasonEnum?.map(item =>
                            <SelectItem value={item} key={item}>{item}</SelectItem>
                          )
                        }
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>

            <Field>
              <Select>
                <FieldLabel>Marque</FieldLabel>
                <SelectTrigger className="w-full max-w-100">
                  <SelectValue placeholder="Choisissez la marque" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Marque</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          </FieldGroup>

          <Field>
            <Controller
              name="materials"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <FieldLabel>Composition</FieldLabel>
                  <SelectTrigger className="w-full max-w-100">
                    <SelectValue placeholder="Choisissez la composition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Composition</SelectLabel>
                      {
                        enums?.MaterialsEnum?.map(item =>
                          <SelectItem value={item} key={item}>{item}</SelectItem>
                        )
                      }
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </Field>

          <Field>
            <Controller
              name="note"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <FieldLabel>Note</FieldLabel>
                  <SelectTrigger className="w-full max-w-100">
                    <SelectValue placeholder="Choisissez la note" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Note</SelectLabel>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </Field>

          <Textarea placeholder="Ajouter un commentaire..." className="w-full max-w-100" {...register("comment")} />

          <Field orientation="horizontal">
            <Button type="submit" disabled={isUploading}>
              {isUploading ? "Upload en cours..." : "Enregistrer"}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </>
  )
}
