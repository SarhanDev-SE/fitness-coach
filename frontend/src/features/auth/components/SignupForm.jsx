import { useState } from "react";
import { signUp } from '../serivces/authService';
import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom";

export default function SignupForm() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState("");
    const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm();

    async function onSubmit(data) {
        try {
            setError(null);
            setMessage("");
            const res = await signUp(data);
            console.log("response", res);

            if (res?.session) {
                setMessage("Account created and logged in!");
            } else {
                setMessage("Account created! Check your email to confirm.");
            }
        } catch (err) {
            setError(err.message);
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    placeholder="Enter Display Name"
                    {...register("displayName", {
                        required: "Display name is required",
                        minLength: { value: 3, message: "Display name must be at least 3 characters" },
                        maxLength: { value: 100, message: "Display name cannot exceed 100 characters" }
                    })}
                />
                {errors.displayName && <p>{errors.displayName.message}</p>}

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
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters long"
                        },
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).*$/,
                            message: "Password must contain an uppercase letter, lowercase letter, number, and symbol"
                        }
                    })}
                />
                {errors.password && <p>{errors.password.message}</p>}

                {error && <p style={{ color: "red" }}>{error}</p>}
                {message && <p style={{ color: "green" }}>{message}</p>}

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Signing Up..." : "Sign Up"}
                </button>

                <p>Already have an account? <Link to="/login">Login</Link></p>
            </form>
        </div>
    );
}