import { cookies } from "next/headers";

export const getCookie = async (): Promise<string> => {
  const cookieStore = await cookies();

  const cookie = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join(";");
  return cookie;
};