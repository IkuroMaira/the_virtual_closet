import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Link} from "@tanstack/react-router";
import { useSignedUrl } from "../hooks/useSignedUrl"

export default function ClothingCard({ clothing }) {
  const signedUrl = useSignedUrl(clothing.picture)

  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0 overflow-hidden">
      {signedUrl && (
        <img
          src={signedUrl}
          alt={clothing.name}
          className="relative aspect-square w-full object-contain bg-muted/40 p-4"
        />
      )}
      <CardHeader>
        <CardAction>
          <Badge variant="secondary">Tag</Badge>
        </CardAction>
        <CardTitle>
          {clothing.name}
        </CardTitle>
        <CardDescription>
          {clothing.category}
        </CardDescription>
      </CardHeader>
      <CardFooter>
      
        <Link to="/clothes/$id" params={{ id: clothing.id }} className="w-full">
          <Button className="w-full cursor-pointer">
            Voir détails
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
