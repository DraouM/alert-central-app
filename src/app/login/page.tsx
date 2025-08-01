import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/icons/Logo";
import { APP_NAME } from "@/lib/constants";

export default function LoginPage() {
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
            <CardDescription>Use your authority-issued credentials.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
             <Link href="/dashboard" className="w-full">
                <Button className="w-full">
                    Login
                </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
