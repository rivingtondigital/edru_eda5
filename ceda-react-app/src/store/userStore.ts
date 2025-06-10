import { create } from 'zustand';
import { User } from '../models/User';
import { storageService } from '../services/storageService';
import sjcl from 'sjcl';

interface UserState {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean; // Retained from previous version for consistency
  error: string | null;   // Retained from previous version for consistency
  login: (username: string, pass: string) => Promise<boolean>;
  logout: () => void;
  register: (username: string, pass: string) => Promise<{ success: boolean; message: string }>;
  checkAuth: () => void; // Action to check auth status on app load
}

const USERS_STORAGE_KEY = 'ceda_users';
const CURRENT_USER_SESSION_KEY = 'ceda_currentUser'; // More specific key for current user session

export const useUserStore = create<UserState>((set, get) => ({
  currentUser: null,
  isAuthenticated: false,
  isLoading: false, // Initialized
  error: null,    // Initialized
  login: async (username, password) => {
    set({ isLoading: true, error: null });
    const users = storageService.getItem<User[]>(USERS_STORAGE_KEY) || [];
    const user = users.find(u => u.username === username);

    if (user && user.passwordHash) {
      try {
        // IMPORTANT: Ensure password is a string and not empty for hashing
        if (typeof password !== 'string' || password.length === 0) {
          console.error("Login: Password is empty or not a string.");
          set({ isLoading: false, error: "Password cannot be empty." });
          return false;
        }
        const passHash = sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(password));
        if (user.passwordHash === passHash) {
          set({ currentUser: user, isAuthenticated: true, isLoading: false });
          storageService.setItem(CURRENT_USER_SESSION_KEY, user);
          return true;
        }
      } catch (e) {
        console.error("Error during password hashing/comparison:", e);
        set({ isLoading: false, error: "Login error during hash comparison." });
        return false;
      }
    }
    set({ isLoading: false, error: "Invalid username or password." });
    return false;
  },
  logout: () => {
    set({ currentUser: null, isAuthenticated: false, isLoading: false, error: null });
    storageService.removeItem(CURRENT_USER_SESSION_KEY);
  },
  register: async (username, password) => {
    set({ isLoading: true, error: null });
    let users = storageService.getItem<User[]>(USERS_STORAGE_KEY) || [];
    if (users.find(u => u.username === username)) {
      set({ isLoading: false, error: 'User already exists.' });
      return { success: false, message: 'User already exists.' };
    }
    try {
      // IMPORTANT: Ensure password is a string and not empty for hashing
      if (typeof password !== 'string' || password.length === 0) {
        console.error("Register: Password is empty or not a string.");
        set({ isLoading: false, error: "Password cannot be empty for registration." });
        return { success: false, message: 'Password cannot be empty.'};
      }
      const passwordHash = sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(password));
      const newUser: User = {
        id: `user_${Date.now()}_${Math.random().toString(36).substring(2,10)}`,
        username,
        passwordHash
      };
      users.push(newUser);
      storageService.setItem(USERS_STORAGE_KEY, users);

      // Automatically log in the new user
      set({ currentUser: newUser, isAuthenticated: true, isLoading: false });
      storageService.setItem(CURRENT_USER_SESSION_KEY, newUser);
      return { success: true, message: 'Registration successful.' };
    } catch (e) {
      console.error("Error during registration hashing/saving:", e);
      set({ isLoading: false, error: "Registration failed due to an error." });
      return { success: false, message: 'Registration failed due to an error.' };
    }
  },
  checkAuth: () => {
    // This function should not trigger loading state unless it's an async check to a backend
    const user = storageService.getItem<User>(CURRENT_USER_SESSION_KEY);
    if (user) {
      // Basic validation: ensure essential user properties exist
      if (user.id && user.username) {
        set({ currentUser: user, isAuthenticated: true });
      } else {
        // Invalid user object in storage, remove it
        storageService.removeItem(CURRENT_USER_SESSION_KEY);
        set({ currentUser: null, isAuthenticated: false });
      }
    } else {
      set({ currentUser: null, isAuthenticated: false });
    }
  }
}));
