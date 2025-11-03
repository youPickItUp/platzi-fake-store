import { useMutation } from "@tanstack/react-query";
import fakeStoreApi, { accessTokenKey } from "./fakeStoreApi";
import z from "zod";
import { useLocation } from "wouter";
import Notify from "simple-notify";

const tokensSchema = z
  .object({
    access_token: z.string(),
    refresh_token: z.string(),
  })
  .transform(({ access_token, refresh_token }) => ({
    accessToken: access_token,
    refreshToken: refresh_token,
  }));

const useLogin = () => {
  const [, navigate] = useLocation();

  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const response = await fakeStoreApi.post("/auth/login", data);
      return tokensSchema.parse(response.data);
    },
    onSuccess: ({ accessToken }) => {
      localStorage.setItem(accessTokenKey, accessToken);
      new Notify({
        status: "success",
        title: "Login successful!",
        autotimeout: 5000,
      });
      navigate("/");
    },
    onError: () => {
      new Notify({
        status: "error",
        title: "Login failed!",
        autotimeout: 5000,
      });
    },
  });
};

export default useLogin;
