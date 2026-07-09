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
import { useItemTags } from "../../tags/hooks/useItemTags";

export default function ClothingCard({ clothing }) {
  const { data: getData } = useItemTags(clothing.id)

  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0 overflow-hidden">
      <img
          src="" // Récupérer l'image en de base données
          alt="Clothing"
          className="relative aspect-4/5 w-full object-cover"
      />
      <CardHeader>
        <CardAction>
          <div className="flex flex-wrap gap-2">
            {(getData || []).map(tag => (
              <Badge style={{ backgroundColor: tag.color }}>{ tag.name }</Badge>
          ))}
          </div>
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
