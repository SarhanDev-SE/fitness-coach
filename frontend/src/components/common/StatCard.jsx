import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

function StatCard({ title, value, description }) {
    return (
        <Card className="bg-card border border-card/50 hover:border-card/80 transition-colors">
            <CardHeader className="pb-2">
                <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {title}
                </CardTitle>
            </CardHeader>

            <CardContent>
                <div className="font-heading text-3xl sm:text-4xl font-bold text-foreground tabular-nums tracking-tight py-2">
                    {value}
                </div>

                {
                    description && (
                        <p className="text-muted-foreground text-xs mt-1.5">{description}</p>
                    )
                }
            </CardContent>
        </Card>
    )
}

export default StatCard;