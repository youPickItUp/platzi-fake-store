import { useForm } from "@tanstack/react-form";
import { useLogin } from "../../api";

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
    <div>
      Login
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field name="email">
          {(field) => (
            <>
              <label htmlFor={field.name}>Username</label>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              ></input>
            </>
          )}
        </form.Field>
        <form.Field name="password">
          {(field) => (
            <>
              <label htmlFor={field.name}>Password</label>
              <input
                type="password"
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              ></input>
            </>
          )}
        </form.Field>
        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <button type="submit">{isSubmitting ? "loading" : "submit"}</button>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
};

export default Login;
