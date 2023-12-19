import { Api } from "../axios-config";
import { ApiExceptionError } from "../axios-config/errors";

interface ILoginOutput {
  accessToken: string;
}

const login = async (
  email: string,
  password: string
): Promise<ILoginOutput> => {
  try {
    const { data } = await Api.get<ILoginOutput>("/login", {
      data: { email, password },
    });
    return data;
  } catch (error) {
    throw ApiExceptionError;
  }
};

export const LoginService = {
  login,
};
