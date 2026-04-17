"use client";

// REACT //
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

// TYPES //
import type { ProjectStructureData } from "@/types/projects";

// COMPONENTS //
import CodeEditor from "@/components/ui/CodeEditor";
import PageIntro from "@/components/ui/PageIntro";

// API SERVICES //
import { updateStructureRequest } from "@/services/api/structure.api";

// CONTEXTS //
import { useProjectDetailsContext } from "@/contexts/ProjectContext";

// CONSTANTS //
import { ROUTES } from "@/app/constants/routes";

// UTILS //
import { normalizePhpCode } from "@/utils/normalization.util";

// OTHERS //
import { toast } from "sonner";

// LIBRARIES //

type StructureEditorModeData = "php" | "json";

interface StructureEditorContentData {
  json: string;
  php: string;
}

const structureEditorContent = {
  php: "",
  json: "{}",
};

/**
 * Normalizes structure JSON into a display-safe string.
 */
function getStructureJsonTextService(
  jsonCodeData: ProjectStructureData["json_code"],
): string {
  if (typeof jsonCodeData === "string") {
    const trimmedJsonData = jsonCodeData.trim();

    if (!trimmedJsonData) {
      return "{}";
    }

    try {
      const parsedJsonData = JSON.parse(trimmedJsonData);
      return JSON.stringify(parsedJsonData, null, 2);
    } catch {
      return trimmedJsonData;
    }
  }

  return JSON.stringify(jsonCodeData ?? {}, null, 2);
}

/**
 * Renders the project structure editor page.
 */
export default function ProjectStructurePage() {
  // Define Navigation
  const router = useRouter();

  // Define Context
  const {
    currentProjectRole,
    projectDetails,
    isProjectDetailsLoading,
    projectDetailsErrorMessage,
  } = useProjectDetailsContext();

  // Define Refs

  // Define States
  const [editorMode, setEditorMode] = useState<StructureEditorModeData>("php");
  const [editorContent, setEditorContent] =
    useState<StructureEditorContentData>(structureEditorContent);

  // Helper Functions
  /**
   * Handles the view mode toggle between PHP and JSON.
   */
  const handleViewInJsonClick = (): void => {
    setEditorMode((previousEditorMode) => {
      return previousEditorMode === "php" ? "json" : "php";
    });
  };

  /**
   * Handles save action for current editor data.
   */
  const handleSaveClick = (): void => {
    // Resolve current project id before attempting save.
    const projectIdData = projectDetails?.project.id;

    if (!projectIdData) {
      toast.error("Project details are not ready yet.");
      return;
    }

    let parsedJsonCodeData: Record<string, unknown>;

    try {
      // Parse JSON editor content and enforce object-only payload.
      const parsedJsonData = JSON.parse(editorContent.json) as unknown;

      if (
        !parsedJsonData ||
        typeof parsedJsonData !== "object" ||
        Array.isArray(parsedJsonData)
      ) {
        toast.error("JSON code must be a valid JSON object.");
        return;
      }

      parsedJsonCodeData = parsedJsonData as Record<string, unknown>;
    } catch {
      // Stop save when JSON syntax is invalid.
      toast.error("JSON code must be valid JSON.");
      return;
    }

    // Normalize PHP content to satisfy backend validation.
    const normalizedPhpCodeData = normalizePhpCode(editorContent.php);

    // Submit structure update request.
    updateStructureRequest(projectIdData, {
      json_code: parsedJsonCodeData,
      php_code: normalizedPhpCodeData,
    })
      .then((updateStructureResponseData) => {
        if (!updateStructureResponseData.status) {
          toast.error(updateStructureResponseData.message);
          return;
        }

        toast.success(updateStructureResponseData.message);
      })
      .catch(() => {
        toast.error("Failed to update structure.");
      });
  };

  /**
   * Handles editor content updates for the current mode.
   */
  const handleEditorChange = (nextEditorValue: string): void => {
    setEditorContent((previousEditorContent) => {
      return {
        ...previousEditorContent,
        [editorMode]: nextEditorValue,
      };
    });
  };

  const activeEditor = editorContent[editorMode];
  const currentStructureVersion = useMemo(() => {
    return projectDetails?.project.structure.current_version ?? null;
  }, [projectDetails]);

  // Use Effects
  useEffect(() => {
    if (!currentStructureVersion) {
      return;
    }

    setEditorContent({
      php: currentStructureVersion.php_code ?? "",
      json: getStructureJsonTextService(currentStructureVersion.json_code),
    });
  }, [currentStructureVersion]);

  useEffect(() => {
    if (isProjectDetailsLoading || !projectDetails?.project.id) {
      return;
    }

    if (currentProjectRole !== "owner") {
      router.replace(ROUTES.APP.PROJECTS.DETAIL(projectDetails.project.id));
    }
  }, [
    currentProjectRole,
    isProjectDetailsLoading,
    projectDetails?.project.id,
    router,
  ]);

  if (
    !isProjectDetailsLoading &&
    projectDetails?.project.id &&
    currentProjectRole !== "owner"
  ) {
    return null;
  }

  return (
    <section className="flex min-h-full flex-col gap-8 bg-n-100 px-6 py-8 md:px-9 md:py-10">
      <PageIntro
        title="Edit structure.php"
        description="Modify the core architectural definition of your project. Ensure syntax is valid before saving."
      />

      {isProjectDetailsLoading ? (
        <p className="text-sm text-n-600">Loading structure...</p>
      ) : null}

      {projectDetailsErrorMessage ? (
        <p className="text-sm text-red-600">{projectDetailsErrorMessage}</p>
      ) : null}

      {/* Code Editor Component */}
      <CodeEditor
        textItem={activeEditor}
        onEditorChange={handleEditorChange}
        onSaveClick={handleSaveClick}
        onViewInJsonClick={handleViewInJsonClick}
      />
    </section>
  );
}
