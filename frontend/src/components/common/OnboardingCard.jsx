import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

export default function OnboardingCard({
  title,
  imageSrc,
  imageAlt = "Onboarding header image",
  form,
  name,
  label,
  description,
  onSubmit,
  children,
}) {
  return (
    <Card className="w-full max-w-md overflow-hidden shadow-lg">
      {/* Responsive Header Image */}
      {imageSrc && (
        <div className="relative w-full h-48 sm:h-56 bg-muted overflow-hidden">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name={name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{label}</FormLabel>
                  <FormControl>
                    {/* Render function to pass field props to children directly */}
                    {typeof children === "function" ? children(field) : children}
                  </FormControl>
                  {description && (
                    <FormDescription>{description}</FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}