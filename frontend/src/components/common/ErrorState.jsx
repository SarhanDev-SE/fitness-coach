import { Button } from "../ui/button";

function ErrorState({
    title = "Something went wrong",
    description = "Please try again later",
    actionLabel = "Try Again",
    onRetry
}) {
    return (
        <div className="text-center p-12 bg-muted/30 rounded-lg border-dashed border-2">
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-muted-foreground mb-4">{description}</p>

            {actionLabel && onRetry && (
                <Button
                    onClick={onRetry}
                    size="lg"
                    className="bg-primary hover:bg-primary/90"
                    variant="outline"
                >
                    {actionLabel}
                </Button>
            )}
        </div>
    )
}

export default ErrorState;