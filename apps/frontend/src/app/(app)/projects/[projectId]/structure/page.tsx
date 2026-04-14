"use client";

// REACT //
import { useEffect, useMemo, useState } from "react";

// COMPONENTS //
import CodeEditor from "@/components/ui/CodeEditor";
import PageIntro from "@/components/ui/PageIntro";

// TYPES //
import type { ProjectStructureData } from "@/types/projects";

// CONTEXTS //
import { useProjectDetailsContext } from "@/contexts/ProjectContext";

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

  // Define Context
  const {
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
    setEditorContent((previousEditorContent) => {
      return {
        ...previousEditorContent,
        [editorMode]: previousEditorContent[editorMode],
      };
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
