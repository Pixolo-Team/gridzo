"use client";
// REACT //
import { useState } from "react";

// TYPES //
import type { MyProjectInvitationData } from "@/types/projects";

// COMPONENTS //
import BellNotification from "@/components/icons/neevo-icons/BellNotification";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// API SERVICES //
import {
  acceptProjectInvitationRequest,
  rejectProjectInvitationRequest,
} from "@/services/api/projects.api";

// CONTEXTS //
import { useProjectInvitationsContext } from "@/contexts/InvitationsContext";

// OTHERS //
import { toast } from "sonner";

/**
 * Renders the shared notification icon button and invitation panel.
 */
export default function NotificationButton() {
  // Define Navigation

  // Define Context
  const {
    invitationItems,
    isInvitationItemsLoading,
    removeInvitationItemService,
  } = useProjectInvitationsContext();

  // Define Refs

  // Define States
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] =
    useState<boolean>(false);
  const [actionInvitationId, setActionInvitationId] = useState<string>("");

  // Helper Functions
  /**
   * Accepts the selected invitation and removes it from the panel list.
   */
  const handleAcceptInvitationService = (invitationId: string): void => {
    // Lock action buttons for this invitation row.
    setActionInvitationId(invitationId);

    /** API Call to accept the invitation */
    acceptProjectInvitationRequest(invitationId)
      .then((response) => {
        if (response.status_code === 200) {
          // Remove accepted invitation from current list.
          removeInvitationItemService(invitationId);

          // Show success toast.
          toast.success(
            response.message || "Invitation accepted successfully.",
          );
          return;
        }

        // Show backend error toast.
        toast.error(response.message || "Failed to accept invitation.");
      })
      .catch(() => {
        // Show request failure toast.
        toast.error("Failed to accept invitation.");
      })
      .finally(() => {
        // Unlock action buttons.
        setActionInvitationId("");
      });
  };

  /**
   * Rejects the selected invitation and removes it from the panel list.
   */
  const handleRejectInvitationService = (invitationId: string): void => {
    setActionInvitationId(invitationId);

    /** API Call to send rejection of the invitations */
    rejectProjectInvitationRequest(invitationId)
      .then((response) => {
        if (response.status_code === 200) {
          removeInvitationItemService(invitationId);

          // Show success toast
          toast.success(
            response.message || "Invitation rejected successfully.",
          );
          return;
        }

        // Show error toast
        toast.error(response.message || "Failed to reject invitation.");
      })
      .catch(() => {
        // Show error toast
        toast.error("Failed to reject invitation.");
      })
      .finally(() => {
        // Clear state
        setActionInvitationId("");
      });
  };

  /**
   * Returns the inviter label from full name fallback email.
   */
  const getInviterLabelService = (
    invitationItem: MyProjectInvitationData,
  ): string => {
    return invitationItem.invited_by_name || invitationItem.invited_by_email;
  };

  /**
   * Formats the created date as month/day label.
   */
  const getInvitationDateLabelService = (
    invitationCreatedAt: string,
  ): string => {
    const invitationCreatedDate = new Date(invitationCreatedAt);

    if (Number.isNaN(invitationCreatedDate.getTime())) {
      return "";
    }

    return invitationCreatedDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
  };

  /**
   * Builds the avatar label from inviter details.
   */
  const getInvitationAvatarLabelService = (
    invitationItem: MyProjectInvitationData,
  ): string => {
    const inviterLabel = getInviterLabelService(invitationItem).trim();

    return inviterLabel.charAt(0).toUpperCase() || "U";
  };

  // Use Effects

  return (
    <Popover
      // Control popover state from component state.
      open={isNotificationPanelOpen}
      // Sync open state when user toggles popover.
      onOpenChange={setIsNotificationPanelOpen}
    >
      <PopoverTrigger asChild>
        <Button
          type="button"
          aria-label="Notifications"
          variant="secondary"
          className="relative size-12 rounded-[26px] border-n-300 bg-n-50 p-0 hover:bg-n-100"
        >
          <BellNotification
            primaryColor="var(--color-n-700)"
            className="size-5"
          />
          {invitationItems.length > 0 ? (
            <span className="absolute right-3 top-3 size-2 rounded-full bg-red-500" />
          ) : null}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        sideOffset={8}
        // Keep balanced left/right spacing on mobile and constrain card width on larger screens.
        className="z-40 w-[calc(100vw-3rem)] max-w-[calc(100vw-3rem)] overflow-hidden rounded-xl border border-n-300 bg-n-50 p-5 text-n-900 shadow-[0_16px_48px_rgba(2,6,23,0.12)] sm:w-[min(688px,calc(100vw-2rem))] sm:max-w-[688px] sm:rounded-2xl sm:p-8"
      >
        {/* Notification panel heading */}
        <div className="flex flex-col gap-1.5 sm:gap-2.5">
          <p className="text-xl font-semibold leading-tight text-n-950 md:text-2xl">
            All Notifications
          </p>
          <p className="text-sm leading-tight font-light text-n-600 md:text-base">
            You have {invitationItems.length} new notifications
          </p>
        </div>

        <div className="my-4 h-px w-full bg-n-300 sm:my-5" />

        {/* Loading state */}
        {isInvitationItemsLoading ? (
          <p className="py-6 text-center text-sm text-n-500">
            Loading invitations...
          </p>
        ) : null}

        {/* Empty state */}
        {!isInvitationItemsLoading && invitationItems.length === 0 ? (
          <p className="py-6 text-center text-sm text-n-500">
            No pending invitations.
          </p>
        ) : null}

        {/* Notification feed */}
        {!isInvitationItemsLoading && invitationItems.length > 0 ? (
          <div className="max-h-[64vh] space-y-5 overflow-y-auto pr-1 md:max-h-[60vh] md:space-y-8">
            {invitationItems.map((invitationItem) => (
              <div
                key={invitationItem.id}
                className="flex items-start gap-2 md:gap-2.5"
              >
                <div className="flex size-11 shrink-0 items-center justify-center rounded-full border-[1.5px] border-purple-300 bg-purple-50 text-sm font-bold text-purple-600 md:size-12">
                  {getInvitationAvatarLabelService(invitationItem)}
                </div>

                <div className="min-w-0 flex gap-3 md:gap-4 flex-col flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex flex-col gap-1">
                      <p className="truncate text-xl font-semibold leading-tight text-n-950 sm:text-lg">
                        {getInviterLabelService(invitationItem)}
                      </p>
                      <p className="text-sm leading-tight text-n-800 md:text-base">
                        <span className="text-n-600">invited you to </span>
                        <span className="font-medium text-n-800">
                          {invitationItem.project_name}
                        </span>
                      </p>
                    </div>

                    <p className="shrink-0 pt-1 text-xs font-medium text-n-500">
                      {getInvitationDateLabelService(invitationItem.created_at)}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      type="button"
                      size="small"
                      variant="secondary"
                      className="h-10 border-green-300 bg-green-50 text-sm text-green-600 hover:bg-green-100 sm:h-11 sm:text-base"
                      onClick={() =>
                        handleAcceptInvitationService(invitationItem.id)
                      }
                      disabled={actionInvitationId === invitationItem.id}
                    >
                      Accept
                    </Button>

                    <Button
                      type="button"
                      size="small"
                      variant="secondary"
                      className="h-10 border-red-300 bg-red-50 text-sm text-red-600 hover:bg-red-100 sm:h-11 sm:text-base"
                      onClick={() =>
                        handleRejectInvitationService(invitationItem.id)
                      }
                      disabled={actionInvitationId === invitationItem.id}
                    >
                      Decline
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </PopoverContent>
    </Popover>
  );
}
