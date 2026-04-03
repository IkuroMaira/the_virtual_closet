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
            <img
                src="https://avatar.vercel.sh/shadcn1"
                alt="Clothing"
                className="relative aspect-4/5 w-full object-cover"
            />
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
                <Button className="w-full">
                    <Link to="/clothes/$id" params={{ id: clothing.id }}>Voir détails</Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
