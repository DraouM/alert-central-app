
// This is a mock authentication hook.
// In a real application, this would be replaced with a proper authentication solution
// that retrieves the user's actual role and data.

import { useContext } from 'react';
import { AuthContext, User } from '@/context/AuthContext';


// You can change the user object here to test different roles.
const mockUser: User = {
  name: "Nadia Cherif",
  email: "nadia.cherif@authority.dz",
  role: "admin", // <-- Change this to 'supervisor' or 'dispatcher' to see different views
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  // For storyboard purposes, if no user is logged in, we can return a default mock user
  // This allows pages to be developed without a full login flow.
  // In a real app, you might redirect to /login if user is null.
  return context;
}
