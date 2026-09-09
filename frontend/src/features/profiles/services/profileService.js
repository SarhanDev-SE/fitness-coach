import { supabase } from "@/lib/supabase";
import { profileSchema} from "../schema/workoutSchema";

export async function getProfile() {
    const {
        data: { user },
        error: userError
    } = await supabase.auth.getUser();

    if (userError) {
        throw userError;
    }

    if (!user) {
        throw new Error("You must be authenticated!#")
    }

    const { data, error } = await supabase
        .from("profile")
        .select("*")
        .eq("user_id", user.id)
        .single();

    if (error) {
        throw error;
    }

    // the date we recieved is now parsed to check it validates zod schema
    return profileSchema.parse(data);
}

