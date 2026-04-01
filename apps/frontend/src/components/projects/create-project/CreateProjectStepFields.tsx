// TYPES //
import type { CreateProjectFieldGroupData } from "@/types/create-project";

// COMPONENTS //
import CreateProjectField from "@/components/projects/create-project/CreateProjectField";

interface CreateProjectStepFieldsPropsData {
  createProjectFormData: Record<string, string>;
  fieldGroupItems: CreateProjectFieldGroupData[];
  onValueChange: (fieldId: string, value: string) => void;
}

/**
 * Renders the configured field groups for a create-project step
 */
export default function CreateProjectStepFields({
  createProjectFormData,
  fieldGroupItems,
  onValueChange,
}: CreateProjectStepFieldsPropsData) {
  // Define Navigation

  // Define Context

  // Define Refs

  // Define States

  // Helper Functions
  /**
   * Gets the layout classes for the current field group
   */
  const getFieldGroupClassName = (
    layout: CreateProjectFieldGroupData["layout"],
  ) => {
    if (layout === "two-column") {
      return "grid w-full gap-7 md:grid-cols-2 md:gap-x-7 md:gap-y-8";
    }

    return "flex w-full flex-col gap-7 md:gap-8";
  };

  // Use Effects

  return (
    <>
      {/* Field Groups */}
      {fieldGroupItems.map((fieldGroupItem, fieldGroupIndex) => (
        <div
          key={`${fieldGroupItem.layout}-${fieldGroupIndex}`}
          className={getFieldGroupClassName(fieldGroupItem.layout)}
        >
          {/* Group Fields */}
          {fieldGroupItem.fieldItems.map((createProjectFieldItem) => (
            <CreateProjectField
              key={createProjectFieldItem.id}
              {...createProjectFieldItem}
              value={createProjectFormData[createProjectFieldItem.id] ?? ""}
              onValueChange={onValueChange}
            />
          ))}
        </div>
      ))}
    </>
  );
}
