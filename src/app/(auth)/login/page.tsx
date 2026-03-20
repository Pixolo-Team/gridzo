/**
 * Renders the login page
 */
export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-10">
      <section className="w-full max-w-md rounded-3xl border border-black/10 bg-white p-8 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-black/50">
          Pixsheet
        </p>
        <h1 className="mt-4 text-3xl font-semibold text-black">Login</h1>
        <p className="mt-3 text-sm text-black/60">
          This route is reserved for authentication. Protected pages will stay
          under the <code>(app)</code> route group.
        </p>
      </section>
    </main>
  );
}
