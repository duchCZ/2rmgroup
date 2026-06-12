import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { Logo } from "@/components/logo";
import { SignOutButton } from "../sign-out-button";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Authoritative server-side gate. The proxy only does an optimistic redirect;
  // this is where access is actually enforced, including the admin role.
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/admin/login");
  }
  if (session.user.role !== "admin") {
    redirect("/admin/login?error=forbidden");
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="border-b border-border">
        <div className="max-w-4xl mx-auto w-full px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size="sm" dark />
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:inline">
              {session.user.email}
            </span>
            <SignOutButton />
          </div>
        </div>
      </header>
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-8">
        {children}
      </main>
    </div>
  );
}
