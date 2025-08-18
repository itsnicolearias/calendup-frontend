"use client"
import { getProfile } from '@/services/settings';
import { UserWithProfile } from '@/types/settings';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface UserContextType {
  user: UserWithProfile | undefined;
  loading: boolean;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserWithProfile | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setUser(undefined);
        setLoading(false);
        return;
      }
      const fetchedUser = await getProfile(token);
      setUser(fetchedUser);
    } catch (error) {
      console.error('Error cargando usuario', error);
      setUser(undefined);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, refreshUser: loadUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser debe usarse dentro de un UserProvider');
  }
  return context;
}
