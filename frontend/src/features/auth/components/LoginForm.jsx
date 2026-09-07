import { useState } from "react";
import { signIn } from '../services/authService';
import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LoadingState from "@/components/common/LoadingState";
export default function LoginForm() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm();

    async function onSubmit(data) {
        try {
            setError(null);
            await signIn(data);
        } catch (err) {
            setError(err.message);
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <LoadingState
                title="Logging in..."
                description="Please wait while we sign you in"
            />
        )
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    placeholder="Email"
                    {...register("email", {
                        required: "Email is required",
                        pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                    })}
                />
                {errors.email && <p>{errors.email.message}</p>}

                <input
                    type="password"
                    placeholder="Password"
                    {...register("password", {
                        required: "Password is required"
                    })}
                />
                {errors.password && <p>{errors.password.message}</p>}

                {error && <p style={{ color: "red" }}>{error}</p>}

                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Logging in..." : "Login"}
                </Button>

                <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
            </form>
        </div>
    );
}