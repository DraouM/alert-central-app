// This is a mock authentication hook.
// In a real application, this would be replaced with a proper authentication solution
// that retrieves the user's actual role and data.

type UserRole = "admin" | "supervisor" | "dispatcher";

interface MockUser {
  name: string;
  email: string;
  role: UserRole;
}

// You can change the user object here to test different roles.
const mockUser: MockUser = {
  name: "Nadia Cherif",
  email: "nadia.cherif@authority.dz",
  role: "admin", // <-- Change this to 'supervisor' or 'dispatcher' to see different views
};

export function useAuth() {
  return {
    user: mockUser,
  };
}
