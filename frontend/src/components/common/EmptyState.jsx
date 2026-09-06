import { Button } from "../ui/button";

function EmptyState({
    title, description, actionLabel, onAction
}){
    return (
        <div className="text-center p-12 bg-muted/30 rounded-lg border-dashed border-2">
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-muted-foreground mb-4">{description}</p>

            {/* if both actioanLabel prop and onAction callback are passed then render a butto having actionLable and onclick runs the callback*/}
            {actionLabel && onAction && (
                <Button onClick={onAction} size="lg" className="bg-primary hover:bg-primary/90">
                    {actionLabel}
                </Button>
            )}
        </div>
    )
}

export default EmptyState;
//example
// title => No workouts yet
// description => Complete your first workout to start tracking your progress.
// actionLabel => [ Start Workout ] 
// onAction => (e) => navigate("/start-workout")