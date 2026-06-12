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

export default function ClothingCard({ clothing }) {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0 overflow-hidden">
      {clothing.image_url && (
        <img
          src={clothing.image_url}
          alt="Clothing"
          className="relative aspect-4/5 w-full object-cover"
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
