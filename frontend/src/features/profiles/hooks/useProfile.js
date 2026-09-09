import { useQuery, useMutation } from "@tanstack/react-query";
import { getProfile, updateProfile } from "../services/profileService";

export function useProfile() {
    return useQuery({
        queryKey: ["profile"],
        queryFn: getProfile,
    })
}

//update profile hook
export function useUpdateProfile() {
    return useMutation({
        mutationFn: (profileData) => updateProfile(profileData),
    })
}