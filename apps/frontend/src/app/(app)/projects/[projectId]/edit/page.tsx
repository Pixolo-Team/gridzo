interface EditProjectPagePropsData {
  params: Promise<{
    projectId: string;
  }>;
}

/**
 * Renders the edit project page
 */
export default async function EditProjectPage({
  params,
}: Readonly<EditProjectPagePropsData>) {
  const { projectId } = await params;

  return (
    <section className="flex flex-col gap-4 px-5 py-10">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-black/50">
        Projects
      </p>
      <h1 className="text-3xl font-semibold text-black">Edit Project</h1>
      <p className="max-w-2xl text-sm text-black/60">
        This dynamic route is reserved for editing project {projectId}.
      </p>
    </section>
  );
}
