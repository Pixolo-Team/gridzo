/**
 * Renders the authentication route layout
 */
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="min-h-screen bg-n-100">{children}</main>;
}
