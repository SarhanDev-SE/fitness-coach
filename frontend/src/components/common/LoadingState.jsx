import { Skeleton } from "../ui/skeleton";

function LoadingState({loading = true }) {
    if (loading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                   

                    {/* profile header */}
                    <div className="space-y-2 flex-1">
                        <Skeleton className="h-6 w-48" />
                        <Skeleton className="h-4 w-64" />
                    </div>

                     {/* skeletion for round avatar */}
                    <Skeleton className="h-12 w-12 rounded-full" />
                </div>

                {/* represents cards/charts */}
                <div className="space-y-3">
                    {
                        [1, 2, 3].map(i => (
                            <div key={i} className="space-y-3">
                                {/* workout title */}
                                <Skeleton className="h-5 w-40" />

                                {/* image placeholder */}
                                <Skeleton className="h-40 w-full rounded-lg" />
                            </div>
                        ))
                    }
                </div>
            </div>

        )
    }
}

export default LoadingState;