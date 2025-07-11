import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
  role: 'player' | 'team';
  profile: {
    age?: number;
    location?: string;
    gamePreferences: string[];
    skillRoles: string[];
    xp: number;
    arcCoins: number;
    level: number;
    achievements: string[];
    following: string[];
    followers: string[];
  };
  team?: {
    id: string;
    name: string;
    role: string;
  };
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string, role: 'player' | 'team') => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User['profile']>) => void;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  role: 'player' | 'team';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data
    const storedUser = localStorage.getItem('arc_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: 'player' | 'team') => {
    setIsLoading(true);
    try {
      // Mock login - in real app this would be API call
      const mockUser: User = {
        id: '1',
        username: email.split('@')[0],
        email,
        role: role,
        profile: {
          gamePreferences: ['Valorant', 'CS2'],
          skillRoles: ['Rifler', 'IGL'],
          xp: 2500,
          arcCoins: 150,
          level: 12,
          achievements: ['First Win', 'Team Player', 'Rising Star'],
          following: ['ProGamer123', 'StreamerPro'],
          followers: ['NewbieFan', 'GameBuddy'],
        },
      };
      setUser(mockUser);
      localStorage.setItem('arc_user', JSON.stringify(mockUser));
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    setIsLoading(true);
    try {
      // Mock registration
      const newUser: User = {
        id: Date.now().toString(),
        username: userData.username,
        email: userData.email,
        role: userData.role,
        profile: {
          gamePreferences: [],
          skillRoles: [],
          xp: 0,
          arcCoins: 50,
          level: 1,
          achievements: [],
          following: [],
          followers: [],
        },
      };
      setUser(newUser);
      localStorage.setItem('arc_user', JSON.stringify(newUser));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('arc_user');
  };

  const updateProfile = (data: Partial<User['profile']>) => {
    if (user) {
      const updatedUser = {
        ...user,
        profile: { ...user.profile, ...data },
      };
      setUser(updatedUser);
      localStorage.setItem('arc_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};