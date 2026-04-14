"use client";
// REACT //
import { useEffect, useState } from "react";

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
  getMyProjectInvitationsRequest,
  rejectProjectInvitationRequest,
} from "@/services/api/projects.api";

// OTHERS //
import { toast } from "sonner";

const INVITATION_CACHE_TTL_MS = 60 * 1000;

/**
 * Renders the shared notification icon button
 */
export default function NotificationButton() {
  // Define Navigation

  // Define Context

  // Define Refs

  // Define States
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] =
    useState<boolean>(false);
  const [invitationItems, setInvitationItems] = useState<
    MyProjectInvitationData[]
  >([]);
  const [isInvitationItemsLoading, setIsInvitationItemsLoading] =
    useState<boolean>(false);
  const [actionInvitationId, setActionInvitationId] = useState<string>("");
  const [lastInvitationFetchTimestamp, setLastInvitationFetchTimestamp] =
    useState<number>(0);

  // Helper Functions
  /**
   * Fetches pending invitations for the authenticated user.
   */
  const getMyProjectInvitationsService = (): void => {
    // Start loading state before requesting invitations.
    setIsInvitationItemsLoading(true);

    /** API Call to fetch pending invitations */
    getMyProjectInvitationsRequest()
      .then((response) => {
        if (response.status_code === 200 && response.data) {
          // Set invitation list from response.
          setInvitationItems(response.data.invitations);
          // Store successful fetch time for cache reuse.
          setLastInvitationFetchTimestamp(Date.now());
          return;
        }

        // Fallback to empty list on invalid response.
        setInvitationItems([]);
      })
      .catch(() => {
        // Fallback to empty list on request failure.
        setInvitationItems([]);
      })
      .finally(() => {
        // End loading state
        setIsInvitationItemsLoading(false);
      });
  };

  /**
   * Accepts the selected invitation and removes it from the panel list.
   */
  const handleAcceptInvitationService = (invitationIdData: string): void => {
    // Lock action buttons for this invitation row.
    setActionInvitationId(invitationIdData);

    /** API Call to accept the invitation */
    acceptProjectInvitationRequest(invitationIdData)
      .then((response) => {
        if (response.status_code === 200) {
          // Remove accepted invitation from current list.
          setInvitationItems((previousInvitationItemsData) => {
            return previousInvitationItemsData.filter((invitationItemData) => {
              return invitationItemData.id !== invitationIdData;
            });
          });

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
  const handleRejectInvitationService = (invitationIdData: string): void => {
    setActionInvitationId(invitationIdData);

    /** API Call to send rejection of the invitations */
    rejectProjectInvitationRequest(invitationIdData)
      .then((response) => {
        if (response.status_code === 200) {
          // Set the invitation items
          setInvitationItems((previousInvitationItemsData) => {
            return previousInvitationItemsData.filter((invitationItemData) => {
              return invitationItemData.id !== invitationIdData;
            });
          });

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
    invitationItemData: MyProjectInvitationData,
  ): string => {
    return (
      invitationItemData.invited_by_name || invitationItemData.invited_by_email
    );
  };

  /**
   * Formats invitation expiry for display.
   */
  const getInvitationExpiryLabelService = (
    invitationExpiresAtData: string | null,
  ): string => {
    if (!invitationExpiresAtData) {
      return "No expiry";
    }

    const invitationExpiryDateData = new Date(invitationExpiresAtData);
    if (Number.isNaN(invitationExpiryDateData.getTime())) {
      return "No expiry";
    }

    return invitationExpiryDateData.toLocaleDateString();
  };

  /**
   * Formats the created date as short month/day label.
   */
  const getInvitationDateLabelService = (
    invitationCreatedAtData: string,
  ): string => {
    const invitationCreatedDateData = new Date(invitationCreatedAtData);

    if (Number.isNaN(invitationCreatedDateData.getTime())) {
      return "";
    }

    return invitationCreatedDateData.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  /**
   * Builds the avatar label from inviter details.
   */
  const getInvitationAvatarLabelService = (
    invitationItemData: MyProjectInvitationData,
  ): string => {
    const inviterLabelData = getInviterLabelService(invitationItemData).trim();

    return inviterLabelData.charAt(0).toUpperCase() || "U";
  };

  // Use Effects
  useEffect(() => {
    if (!isNotificationPanelOpen) {
      return;
    }

    // Skip API call when cached payload is still fresh.
    const isInvitationCacheFreshData =
      lastInvitationFetchTimestamp > 0 &&
      Date.now() - lastInvitationFetchTimestamp < INVITATION_CACHE_TTL_MS;

    if (isInvitationCacheFreshData) {
      return;
    }

    getMyProjectInvitationsService();
  }, [isNotificationPanelOpen, lastInvitationFetchTimestamp]);

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
        // Align panel with notification trigger on the right.
        align="end"
        sideOffset={8}
        className="z-40 w-[360px] overflow-hidden rounded-[26px] border border-[#4a4a4f] bg-[#242428] p-0 text-[#e8e8ea] shadow-[0_24px_60px_rgba(0,0,0,0.5)] md:w-[480px]"
      >
        {/* Notification panel heading */}
        <div className="border-b border-[#3a3a3f] px-5 py-4">
          <h3 className="text-[28px] font-semibold leading-none tracking-[-0.02em]">
            All notifications
          </h3>
        </div>

        {/* Loading state */}
        {isInvitationItemsLoading ? (
          <p className="py-8 text-center text-sm text-[#b8b8be]">
            Loading invitations...
          </p>
        ) : null}

        {/* Empty state */}
        {!isInvitationItemsLoading && invitationItems.length === 0 ? (
          <p className="py-8 text-center text-sm text-[#b8b8be]">
            No pending invitations.
          </p>
        ) : null}

        {/* Notification feed */}
        {!isInvitationItemsLoading && invitationItems.length > 0 ? (
          <div className="max-h-[420px] overflow-y-auto">
            {invitationItems.map((invitationItem) => (
              <div
                key={invitationItem.id}
                className="border-b border-[#34343a] px-5 py-4 last:border-b-0"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-full bg-[#5f6dd8] text-lg font-semibold text-white">
                    {getInvitationAvatarLabelService(invitationItem)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-lg font-semibold leading-tight text-[#f4f4f6]">
                          {getInviterLabelService(invitationItem)}
                        </p>
                        <p className="truncate text-base text-[#d2d2d6]">
                          Invited you to {invitationItem.project_name}
                        </p>
                      </div>
                      <p className="shrink-0 pt-1 text-sm text-[#93939a]">
                        {getInvitationDateLabelService(
                          invitationItem.created_at,
                        )}
                      </p>
                    </div>

                    <p className="mt-1 text-sm text-[#ababaf]">
                      Expires:{" "}
                      {getInvitationExpiryLabelService(
                        invitationItem.expires_at,
                      )}
                    </p>

                    {/* Invitation actions */}
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <Button
                        type="button"
                        size="small"
                        variant="secondary"
                        className="h-9 border-[#54545b] bg-transparent text-xs text-[#e8e8ea] hover:bg-[#313136]"
                        onClick={() =>
                          handleRejectInvitationService(invitationItem.id)
                        }
                        disabled={actionInvitationId === invitationItem.id}
                      >
                        Reject
                      </Button>
                      <Button
                        type="button"
                        size="small"
                        variant="primary"
                        className="h-9 bg-[#5f6dd8] text-xs text-white hover:bg-[#6f7be1]"
                        onClick={() =>
                          handleAcceptInvitationService(invitationItem.id)
                        }
                        disabled={actionInvitationId === invitationItem.id}
                      >
                        Accept
                      </Button>
                    </div>
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
