interface ProjectPagePropsData {
  params: Promise<{
    projectId: string;
  }>;
}

/**
 * Renders the project details page
 */
export default async function ProjectPage({
  params,
}: Readonly<ProjectPagePropsData>) {
  const { projectId } = await params;

  return (
    <section className="flex flex-col gap-4 px-5 py-10">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-black/50">
        Projects
      </p>
      <h1 className="text-3xl font-semibold text-black">Project {projectId}</h1>
      <p className="max-w-2xl text-sm text-black/60">
        This route is the project destination after selecting a project from the
        dashboard list.
      </p>
    </section>
  );
}
