import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

function StatCard({ title, value, description }) {
    return (
        <Card className="bg-card border border-card/50 hover:border-card/80 transition-colors">
            <CardHeader>
                <CardTitle className="text-sm font-medium text-foreground">
                    {title}
                </CardTitle>
            </CardHeader>

            <CardContent>
                <div className="text-3xl font-bold text-primary">
                    {value}
                </div>

                {
                    description && (
                        <p className="text-muted-foreground text-sm mt-1">{description}</p>
                    )
                }
            </CardContent>
        </Card>
    )
}

export default StatCard;