import api from "./api";
import { LoginPayload, Merchant, SignupPayload } from "@/types/auth";

export async function signup(
  payload: SignupPayload
): Promise<Merchant> {
  const { data } = await api.post<Merchant>(
    "/auth/signup",
    payload
  );
  return data;
}

export async function login(
  payload: LoginPayload
): Promise<Merchant> {
  const { data } = await api.post<Merchant>(
    "/auth/login",
    payload
  );
  return data;
}

export async function logout(): Promise<void> {
  await api.post("/auth/logout");
}

export async function getCurrentMerchant(): Promise<Merchant | null> {
  try {
    const { data } = await api.get<Merchant>("/auth/me");
    return data;
  } catch {
    return null;
  }
}