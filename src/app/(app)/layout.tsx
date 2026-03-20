/**
 * Renders the protected application layout
 */
export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="min-h-screen bg-n-100">{children}</div>;
}
