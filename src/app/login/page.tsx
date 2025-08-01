
'use client'

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/icons/Logo";
import { APP_NAME } from "@/lib/constants";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    const email = (document.getElementById('email') as HTMLInputElement).value;
    
    let role: 'admin' | 'supervisor' | 'dispatcher' = 'dispatcher';
    let name = "Dispatcher User";

    if (email.includes('admin')) {
      role = 'admin';
      name = "Admin User";
    } else if (email.includes('supervisor')) {
      role = 'supervisor';
      name = "Supervisor User";
    }

    login({
      name: name,
      email: email,
      role: role,
    });
    router.push('/dashboard');
  };

  return (
    <main className="w-full min-h-screen lg:grid lg:grid-cols-2">
       <div className="hidden bg-muted lg:block">
        <Image
          src="https://placehold.co/1920x1080.png"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          data-ai-hint="city operations center"
        />
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[400px] gap-6 p-6">
          <div className="grid gap-2 text-center">
            <Logo className="h-12 w-12 text-primary mx-auto" />
            <h1 className="text-3xl font-bold">{APP_NAME}</h1>
            <p className="text-balance text-muted-foreground">
              Enter your credentials to access the admin panel
            </p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>
                Use <code className="bg-muted px-1 rounded-sm text-xs">admin@authority.dz</code> for admin access.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    defaultValue="admin@authority.dz"
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="#"
                      className="ml-auto inline-block text-sm underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <Input id="password" type="password" required defaultValue="password" />
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id="remember-me" />
                    <Label htmlFor="remember-me" className="text-sm font-normal">Remember me</Label>
                </div>
                <Button type="submit" className="w-full" onClick={handleLogin}>
                  Login
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="#" className="underline">
                  Sign up
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
