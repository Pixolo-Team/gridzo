"use client";

// REACT //
import { useState } from "react";

// COMPONENTS //
import CodeEditor from "@/components/ui/CodeEditor";
import PageIntro from "@/components/ui/PageIntro";

type StructureEditorModeData = "php" | "json";

interface StructureEditorContentData {
  json: string;
  php: string;
}

const structureEditorContent = {
  php: `<?php
return [
    'app_name' => 'Structure Editor',
    'version' => '2.1.0',
    'core' => [
        'mode' => 'production',
        'debug' => false,
        'architecture' => 'monolith-first',
        'scaling' => [
            'auto' => true,
            'threshold' => 75
        ]
    ],
    'definitions' => [
        'routes' => 'api/v1',
        'controllers' => 'src/Controllers',
        'models' => 'src/Models'
    ]
];`,
  json: `{
  "app_name": "Structure Editor",
  "version": "2.1.0",
  "core": {
    "mode": "production",
    "debug": false,
    "architecture": "monolith-first",
    "scaling": {
      "auto": true,
      "threshold": 75
    }
  },
  "definitions": {
    "routes": "api/v1",
    "controllers": "src/Controllers",
    "models": "src/Models"
  }
}`,
};

/**
 * Renders the project structure editor page.
 */
export default function ProjectStructurePage() {
  // Define Navigation

  // Define Context

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

  // Use Effects

  return (
    <section className="flex min-h-full flex-col gap-8 bg-n-100 px-6 py-8 md:px-9 md:py-10">
      <PageIntro
        title="Edit structure.php"
        description="Modify the core architectural definition of your project. Ensure syntax is valid before saving."
      />

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
