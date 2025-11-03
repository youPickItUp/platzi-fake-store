import { useForm } from "@tanstack/react-form";
import { useLogin } from "../../api";
import { Button, Card, Label, TextInput } from "flowbite-react";

const Login = () => {
  const loginMutation = useLogin();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      await loginMutation.mutateAsync(value);
    },
  });

  return (
    <div className="flex justify-center">
      <Card>
        <form
          className="flex max-w-md flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.Field name="email">
            {(field) => (
              <>
                <Label htmlFor={field.name}>Username</Label>
                <TextInput
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                ></TextInput>
              </>
            )}
          </form.Field>
          <form.Field name="password">
            {(field) => (
              <>
                <Label htmlFor={field.name}>Password</Label>
                <TextInput
                  type="password"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                ></TextInput>
              </>
            )}
          </form.Field>
          <form.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => (
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Loading" : "Submit"}
              </Button>
            )}
          </form.Subscribe>
        </form>
      </Card>
    </div>
  );
};

export default Login;
