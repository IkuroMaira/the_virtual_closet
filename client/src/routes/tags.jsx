import { createFileRoute } from "@tanstack/react-router";
import TagsDisplay from "../features/tags/index.js";

export const Route = createFileRoute('/tags') ({
    component: TagsPage,
})

function TagsPage() {
    return (
        <>
            <h1>Gestion des tags</h1>
            <TagsDisplay />
        </>
    )
}
