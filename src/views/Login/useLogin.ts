import { useMutation } from "@tanstack/react-query";
import fakeStoreApi from "../../fakeStoreApi";
import z from "zod";
import axios from "axios";
import router from "../../router";

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
  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const response = await fakeStoreApi.post("/auth/login", data);
      return tokensSchema.parse(response.data);
    },
    onSuccess: ({ accessToken }) => {
      axios.defaults.headers.common[`Authorization`] = `Bearer ${accessToken}`;
      router.replace("products");
    },
  });
};

export default useLogin;
