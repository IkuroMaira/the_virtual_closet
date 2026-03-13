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

export default function ClothingCard({ clothe }) {
    return (
        <Card className="relative mx-auto w-full max-w-sm pt-0 overflow-hidden">
            <img
                src="https://avatar.vercel.sh/shadcn1"
                alt="Clothe"
                className="relative aspect-4/5 w-full object-cover"
            />
            <CardHeader>
                <CardAction>
                    <Badge variant="secondary">Tag</Badge>
                </CardAction>
                <CardTitle>
                    {clothe.name}
                </CardTitle>
                <CardDescription>
                    {clothe.category}
                </CardDescription>
            </CardHeader>
            <CardFooter>
                <Button className="w-full">Voir détails</Button>
            </CardFooter>
        </Card>
    )
}
