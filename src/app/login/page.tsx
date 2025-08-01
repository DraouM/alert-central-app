
'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/icons/Logo";
import { APP_NAME } from "@/lib/constants";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    // In a real app, you'd get credentials from the form
    const email = (document.getElementById('email') as HTMLInputElement).value;
    
    // Mock logic to determine role based on email
    let role: 'admin' | 'supervisor' | 'dispatcher' = 'dispatcher';
    if (email.includes('admin')) {
      role = 'admin';
    } else if (email.includes('supervisor')) {
      role = 'supervisor';
    }

    login({
      name: "Logged In User", // Replace with name from form/API
      email: email,
      role: role,
    });
    router.push('/dashboard');
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
            <div className="flex justify-center">
              <Logo className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">{APP_NAME}</h1>
            <p className="text-muted-foreground">Enter your credentials to access the admin panel</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Use your authority-issued credentials. <br /> Try <code className="bg-muted px-1 rounded-sm">admin@authority.dz</code></CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required defaultValue="admin@authority.dz" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required defaultValue="password" />
            </div>
            <Button className="w-full" onClick={handleLogin}>
                Login
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
