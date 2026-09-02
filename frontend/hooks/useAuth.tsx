"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import * as authApi from "@/lib/auth-api";
import { LoginPayload, Merchant, SignupPayload } from "@/types/auth";

interface AuthContextValue {
  merchant: Merchant | null;
  loading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  signup: (payload: SignupPayload) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

const MERCHANT_ID_KEY = "merchant_id";

function syncMerchantId(merchant: Merchant | null) {
  if (typeof window === "undefined") return;
  if (merchant) {
    localStorage.setItem(MERCHANT_ID_KEY, merchant.id);
  } else {
    localStorage.removeItem(MERCHANT_ID_KEY);
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [merchant, setMerchant] = useState<Merchant | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const current = await authApi.getCurrentMerchant();
    setMerchant(current);
    syncMerchantId(current);
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await refresh();
      setLoading(false);
    })();
  }, [refresh]);

  const login = useCallback(async (payload: LoginPayload) => {
    const current = await authApi.login(payload);
    setMerchant(current);
    syncMerchantId(current);
  }, []);

  const signup = useCallback(async (payload: SignupPayload) => {
    const current = await authApi.signup(payload);
    setMerchant(current);
    syncMerchantId(current);
  }, []);

  const logout = useCallback(async () => {
    await authApi.logout();
    setMerchant(null);
    syncMerchantId(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ merchant, loading, login, signup, logout, refresh }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}