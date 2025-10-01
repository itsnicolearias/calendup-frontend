"use client"
import { getProfile } from '@/services/settings';
import { UserWithProfile } from '@/types/settings';
import { useRouter, usePathname } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface UserContextType {
  user: UserWithProfile | null;
  loading: boolean;
  error: string | null;
  refreshUser: () => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserWithProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    // evitar loop si ya está en login
    if (pathname !== "/auth/login") {
      router.push("/auth/login");
    }
  };

  const loadUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        if (pathname !== "/auth/login") {
          router.push("/auth/login");
        }
        return;
      }

      const fetchedUser = await getProfile(token);
      setUser(fetchedUser ?? null);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Error cargando usuario", err);

      if (err?.statusCode === 401 || err?.statusCode === 403) {
        // token inválido o expirado → desloguear
        logout();
      } else {
        // otro error → dejar al usuario en null pero no redirigir
        setUser(null);
        setError("No se pudo verificar la sesión. Intenta más tarde.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserContext.Provider
      value={{ user, loading, error, refreshUser: loadUser, logout }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser debe usarse dentro de un UserProvider');
  }
  return context;
}
