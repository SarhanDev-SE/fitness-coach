import SignupForm from "../features/auth/components/SignupForm"

export default function Signup() {
    return (
        <main className="flex min-h-screen items-center justify-center p-6">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>
                        Signup now to meet your AI fitness coach 'Repwise'!
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <SignupForm />
                </CardContent>
            </Card>
        </main>
    )

}