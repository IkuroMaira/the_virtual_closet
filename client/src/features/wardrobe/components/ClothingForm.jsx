import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
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
import { useCreateClothing } from "../hooks/useCreateClothing"
import { useState } from "react"

export default function ClothingForm() {
  const [formData, setFormData] = useState({ name: '', category: '', color: '' })
  const { mutate } = useCreateClothing()
  const handleSubmit = (e) => {
    e.preventDefault()
    mutate(formData)
  }
  
  return (
    <>
      <h1>Ajouter un vêtement à votre dressing</h1>

      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <Field className="w-full max-w-100">
            <FieldLabel htmlFor="fieldgroup-name input-required">Nom<span className="text-destructive">*</span></FieldLabel>
            <Input
              id="fieldgroup-name"
              placeholder="T-shirt vintage"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          </Field>
          {/* TODO Ajouter une élément pour indiquer le nombre de caractères restant*/}
          {/* TODO Ajouter les messages d'erreurs et d'alertes */}
  
          <Field className="w-full max-w-100">
            <FieldLabel htmlFor="picture">Photo</FieldLabel>
            <Input id="picture" type="file" />
          </Field>
          
          <Field>
            <Select onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <FieldLabel>Catégories</FieldLabel>
              <SelectTrigger className="w-full max-w-100">
                <SelectValue placeholder="Choisissez la catégorie" />
              </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Catégories</SelectLabel>
                    <SelectItem value="Tops">Tops</SelectItem>
                  </SelectGroup>
                </SelectContent>
            </Select>
          </Field>
  
          <FieldGroup className="grid max-w-100 grid-cols-2">
            <Field>
              <Select onValueChange={(value) => setFormData({ ...formData, color: value })}>
                <FieldLabel>Couleurs</FieldLabel>
                <SelectTrigger className="w-full max-w-100">
                  <SelectValue placeholder="Choisissez la couleur" />
                </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Couleurs</SelectLabel>
                      <SelectItem value="Bleu">Bleu</SelectItem>
                    </SelectGroup>
                  </SelectContent>
              </Select>
            </Field>
  
            <Field>
              <Select>
                <FieldLabel>Taille</FieldLabel>
                <SelectTrigger className="w-full max-w-100">
                  <SelectValue placeholder="Choisissez la taille" />
                </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Taille</SelectLabel>
                      <SelectItem value="apple">Apple</SelectItem>
                    </SelectGroup>
                  </SelectContent>
              </Select>
            </Field>
          </FieldGroup>
  
          <FieldGroup className="grid max-w-100 grid-cols-2">
            <Field>
              <Select>
                <FieldLabel>Statut</FieldLabel>
                <SelectTrigger className="w-full max-w-100">
                  <SelectValue placeholder="Choisissez le statut" />
                </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Statut</SelectLabel>
                      <SelectItem value="apple">Apple</SelectItem>
                    </SelectGroup>
                  </SelectContent>
              </Select>
            </Field>
  
            <Field>
              <Select>
                <FieldLabel>Style</FieldLabel>
                <SelectTrigger className="w-full max-w-100">
                  <SelectValue placeholder="Choisissez le style" />
                </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Style</SelectLabel>
                      <SelectItem value="apple">Apple</SelectItem>
                    </SelectGroup>
                  </SelectContent>
              </Select>
            </Field>
          </FieldGroup>
  
          <FieldGroup className="grid max-w-100 grid-cols-2">
            <Field>
              <Select>
                <FieldLabel>Saison</FieldLabel>
                <SelectTrigger className="w-full max-w-100">
                  <SelectValue placeholder="Choisissez la saison" />
                </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Saison</SelectLabel>
                      <SelectItem value="apple">Apple</SelectItem>
                    </SelectGroup>
                  </SelectContent>
              </Select>
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
            <Select>
              <FieldLabel>Composition</FieldLabel>
              <SelectTrigger className="w-full max-w-100">
                <SelectValue placeholder="Choisissez la composition" />
              </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Composition</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                  </SelectGroup>
                </SelectContent>
            </Select>
          </Field>
  
          <Field>
            <Select>
              <FieldLabel>Note</FieldLabel>
              <SelectTrigger className="w-full max-w-100">
                <SelectValue placeholder="Choisissez la note" />
              </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Note</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                  </SelectGroup>
                </SelectContent>
            </Select>
          </Field>
  
          <Textarea placeholder="Ajouter un commentaire..." className="w-full max-w-100"/>
        
          {/* <Field>
            <FieldLabel htmlFor="fieldgroup-email">Email</FieldLabel>
            <Input
              id="fieldgroup-email"
              type="email"
              placeholder="name@example.com"
            />
            <FieldDescription>
              We&apos;ll send updates to this address.
            </FieldDescription>
          </Field>*/}
          
          <Field orientation="horizontal">
            <Button type="submit">Submit</Button>
          </Field>
        </FieldGroup>
      </form>
    </>
  )
}
