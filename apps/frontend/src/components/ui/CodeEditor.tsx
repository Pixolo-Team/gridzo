"use client";

// REACT //
import { CSSProperties, useCallback, useMemo, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";

// STYLES //
import { createTheme } from "@uiw/codemirror-themes";

// COMPONENTS //
import CompareArrow from "@/components/icons/neevo-icons/CompareArrow";
import TextFile from "@/components/icons/neevo-icons/TextFile";
import { Button } from "@/components/ui/button";

// LIBRARIES //
import { json } from "@codemirror/lang-json";
import { php } from "@codemirror/lang-php";
import { EditorView } from "@codemirror/view";
import { tags as t } from "@lezer/highlight";
import { cn } from "@/lib/utils";

interface CodeEditorPropsData {
  textItem: string;
  onEditorChange: (nextEditorValue: string) => void;
  onSaveClick: () => void;
  onViewInJsonClick: () => void;
}

interface EditorCursorData {
  column: number;
  line: number;
}

const codeEditorTextColor = "var(--color-n-950)";
const codeEditorSelectionColor = "#0cce4a2e";
const codeEditorTagItems = [
  t.comment,
  t.variableName,
  t.string,
  t.number,
  t.bool,
  t.null,
  t.keyword,
  t.operator,
  t.className,
  t.typeName,
  t.attributeName,
] as const;

const codeEditorBasicSetup = {
  foldGutter: false,
  highlightActiveLine: false,
  highlightActiveLineGutter: true,
  lineNumbers: true,
  bracketMatching: true,
  autocompletion: true,
};

const codeEditorTheme = createTheme({
  theme: "light",
  settings: {
    background: "var(--color-n-50)",
    backgroundImage: "",
    foreground: codeEditorTextColor,
    caret: "var(--color-n-700)",
    selection: codeEditorSelectionColor,
    selectionMatch: codeEditorSelectionColor,
    lineHighlight: "#00000000",
    gutterBackground: "var(--color-n-200)",
    gutterForeground: "var(--color-n-500)",
  },
  styles: codeEditorTagItems.map((tag) => {
    return { tag, color: codeEditorTextColor };
  }),
});

const codeEditorLayoutTheme = EditorView.theme({
  "&": {
    backgroundColor: "var(--color-n-50)",
    color: codeEditorTextColor,
    fontFamily:
      "var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, monospace",
    height: "100%",
  },
  ".cm-editor": {
    backgroundColor: "var(--color-n-50)",
    color: codeEditorTextColor,
    height: "100%",
  },
  ".cm-scroller": {
    backgroundColor: "var(--color-n-50)",
    fontFamily:
      "var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, monospace",
    minHeight: "100%",
  },
  ".cm-content": {
    backgroundColor: "var(--color-n-50)",
    color: codeEditorTextColor,
    border:
      "2px solid var(--editor-validation-color, var(--color-success-500))",
    boxSizing: "border-box",
    fontSize: "16px",
    height: "100%",
    lineHeight: "28px",
    minHeight: "100%",
    padding: "20px",
  },
  ".cm-line": {
    color: "var(--color-n-600)",
  },
  ".cm-gutters": {
    borderRight: "1px solid var(--color-n-200)",
    minHeight: "100%",
  },
  ".cm-lineNumbers .cm-gutterElement": {
    fontSize: "14px",
    minWidth: "32px",
    padding: "0 12px",
  },
  ".cm-activeLineGutter": {
    color: "var(--color-n-800)",
    fontWeight: "700",
  },
  ".cm-activeLine": {
    backgroundColor: "transparent",
  },
  ".cm-focused": {
    outline: "none",
  },
  ".cm-cursor": {
    borderLeftColor: "var(--color-n-700)",
  },
  ".cm-selectionBackground, ::selection": {
    backgroundColor: "var(--color-n-400)",
  },
});

/**
 * Checks whether the current data appears to be JSON.
 */
function checkIsJsonModeService(editorValue: string): boolean {
  const trimmedEditorValue = editorValue.trim();

  return (
    trimmedEditorValue.startsWith("{") || trimmedEditorValue.startsWith("[")
  );
}

/**
 * Validates balanced quote and bracket pairs for PHP-like content.
 */
function checkBalancedPairsService(editorValue: string): boolean {
  const openingCharacters: Record<string, string> = {
    "(": ")",
    "[": "]",
    "{": "}",
  };
  const closingCharacters = new Set(Object.values(openingCharacters));
  const stackCharacters: string[] = [];

  let activeQuoteCharacter: "'" | '"' | null = null;
  let isEscapedCharacter = false;

  // Track quotes and escapes so brackets inside strings are ignored.
  for (const editorCharacter of editorValue) {
    if (activeQuoteCharacter) {
      if (isEscapedCharacter) {
        isEscapedCharacter = false;
        continue;
      }

      if (editorCharacter === "\\") {
        isEscapedCharacter = true;
        continue;
      }

      if (editorCharacter === activeQuoteCharacter) {
        activeQuoteCharacter = null;
      }
      continue;
    }

    if (editorCharacter === "'" || editorCharacter === '"') {
      activeQuoteCharacter = editorCharacter;
      continue;
    }

    if (openingCharacters[editorCharacter]) {
      stackCharacters.push(editorCharacter);
      continue;
    }

    if (closingCharacters.has(editorCharacter)) {
      const previousOpeningCharacter = stackCharacters.pop();

      if (!previousOpeningCharacter) {
        return false;
      }

      if (openingCharacters[previousOpeningCharacter] !== editorCharacter) {
        return false;
      }
    }
  }

  return !activeQuoteCharacter && stackCharacters.length === 0;
}

/**
 * Validates JSON or PHP editor content.
 */
function checkEditorValidityService(editorValue: string): boolean {
  if (checkIsJsonModeService(editorValue)) {
    try {
      JSON.parse(editorValue);
      return true;
    } catch {
      return false;
    }
  }

  const trimmedEditorValue = editorValue.trim();
  if (!trimmedEditorValue.startsWith("<?php")) {
    return false;
  }

  return checkBalancedPairsService(editorValue);
}

/**
 * Renders the full project code editor with internal styling and validation.
 */
export default function CodeEditor({
  textItem,
  onEditorChange,
  onSaveClick,
  onViewInJsonClick,
}: CodeEditorPropsData) {
  // Define Navigation

  // Define Context

  // Define Refs

  // Define States
  const [editorCursor, setEditorCursor] = useState<EditorCursorData>({
    line: 1,
    column: 1,
  });

  // Helper Functions
  /**
   * Updates line and column status from the current editor selection.
   */
  const updateCursorPosition = useCallback((view: EditorView): void => {
    const activeSelection = view.state.selection.main.head;
    const activeLine = view.state.doc.lineAt(activeSelection);

    setEditorCursor({
      line: activeLine.number,
      column: activeSelection - activeLine.from + 1,
    });
  }, []);

  const isJsonMode = checkIsJsonModeService(textItem);
  const isEditorValid = useMemo(() => {
    return checkEditorValidityService(textItem);
  }, [textItem]);
  const editorValidationColor = isEditorValid
    ? "var(--color-success-500)"
    : "var(--color-red-500)";

  /** Memoizes editor extensions based on the current mode (PHP or JSON) and theme. */
  const editorExtensions = useMemo(() => {
    const languageExtension = isJsonMode ? json() : php();

    return [
      codeEditorTheme,
      codeEditorLayoutTheme,
      languageExtension,
      EditorView.lineWrapping,
      // Keep status bar cursor position in sync with keyboard and mouse moves.
      EditorView.updateListener.of((update) => {
        if (!update.docChanged && !update.selectionSet) {
          return;
        }

        updateCursorPosition(update.view);
      }),
    ];
  }, [isJsonMode, updateCursorPosition]);

  // Use Effects

  return (
    <div className="overflow-hidden rounded-3xl bg-n-50">
      {/* Editor Toolbar */}
      <div className="flex items-center justify-between border-b border-n-200 bg-n-200 px-4 py-3.5 md:h-[74px] md:px-6">
        <div className="flex min-w-0 items-center gap-3 md:gap-7">
          <div className="flex items-center gap-2.5">
            {/* Icon */}
            <TextFile
              primaryColor="var(--color-n-700)"
              className="size-3 md:size-4"
            />

            <span className="text-sm font-semibold text-n-700 md:text-lg md:leading-6">
              structure.php
            </span>
          </div>

          {/* Divider */}
          <span className="h-5 w-px bg-n-300" />

          <button
            type="button"
            className={cn(
              "inline-flex cursor-pointer items-center gap-1.5 text-sm transition-colors md:gap-2",
              isJsonMode
                ? "text-n-900 hover:text-n-900"
                : "text-n-600 hover:text-n-800",
            )}
            onClick={onViewInJsonClick}
          >
            {/* Icon */}
            <CompareArrow
              primaryColor="var(--color-n-700)"
              className="size-3.5 md:size-4"
            />
            <span className="md:text-lg md:leading-[24px]">View in JSON</span>
          </button>
        </div>

        {/* Save Button */}
        <Button
          type="button"
          size="small"
          className="hidden h-auto rounded-md bg-green-50 px-3 py-2 text-xs font-semibold text-green-500 hover:bg-green-100 md:inline-flex"
          onClick={onSaveClick}
        >
          Save
        </Button>
      </div>

      {/* Editor Body */}
      <div className="relative min-h-[450px]">
        <CodeMirror
          value={textItem}
          basicSetup={codeEditorBasicSetup}
          extensions={editorExtensions}
          onChange={onEditorChange}
          className="h-full"
          style={
            {
              "--editor-validation-color": editorValidationColor,
            } as CSSProperties
          }
        />

        {/* Save Button */}
        <Button
          type="button"
          size="small"
          className="absolute right-4 bottom-4 h-auto rounded-md bg-green-50 px-4 py-2 text-base font-semibold text-green-500 hover:bg-green-100 md:hidden"
          onClick={onSaveClick}
        >
          Save
        </Button>
      </div>

      {/* Editor Footer */}
      <div className="flex items-center gap-4 bg-n-200 px-4 py-5 text-xs text-n-800 md:px-5">
        <span>
          Line {editorCursor.line}, Column {editorCursor.column}
        </span>
        <span>UTF-8</span>
      </div>
    </div>
  );
}
