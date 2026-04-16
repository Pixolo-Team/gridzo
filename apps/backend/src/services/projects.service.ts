// MODELS //
import type { ProjectInvitationData } from "@/models/project-invitation.model";
import type {
  CreateProjectTransactionResultData,
  EditProjectPayloadData,
  EditProjectResponseData,
  ProjectByIdResultData,
  ProjectData,
  ProjectInboxInvitationData,
  ProjectInboxInvitationsPayloadData,
  ProjectPendingInvitationData,
  ProjectUserData,
  ProjectUsersPayloadData,
  ProjectWithRoleData,
} from "@/models/project.model";

// TYPES //
import type { QueryResponseData } from "@/common/types/query.response.type";

// CONSTANTS //
import { HTTP_STATUS } from "@/constants/api";
import { rpcFunctions, tables } from "@/constants/database.constants";

// UTILS //
import { logger } from "@/common/utils/logger.util";

// CONFIG //
import {
  createSupabaseClientByTokenRequest,
  supabase,
} from "@/config/supabase";

const slugConflictMarker = "SLUG_CONFLICT";

type GetAllProjectUsersServiceResponseData =
  QueryResponseData<ProjectUsersPayloadData> & {
    statusCode:
      | typeof HTTP_STATUS.OK
      | typeof HTTP_STATUS.UNAUTHORIZED
      | typeof HTTP_STATUS.FORBIDDEN
      | typeof HTTP_STATUS.NOT_FOUND
      | typeof HTTP_STATUS.INTERNAL_SERVER_ERROR;
  };

type InviteUserStatusCodeData =
  | typeof HTTP_STATUS.OK
  | typeof HTTP_STATUS.UNAUTHORIZED
  | typeof HTTP_STATUS.NOT_FOUND
  | typeof HTTP_STATUS.INTERNAL_SERVER_ERROR;

type InviteUserServiceResponseData = QueryResponseData<
  Pick<
    ProjectInvitationData,
    "id" | "project_id" | "invited_user_id" | "role" | "status" | "expires_at"
  >
> & {
  statusCode: InviteUserStatusCodeData;
};

type GetMyProjectInvitationsStatusCodeData =
  | typeof HTTP_STATUS.OK
  | typeof HTTP_STATUS.UNAUTHORIZED
  | typeof HTTP_STATUS.INTERNAL_SERVER_ERROR;

type GetMyProjectInvitationsServiceResponseData =
  QueryResponseData<ProjectInboxInvitationsPayloadData> & {
    statusCode: GetMyProjectInvitationsStatusCodeData;
  };

type RespondProjectInvitationStatusCodeData =
  | typeof HTTP_STATUS.OK
  | typeof HTTP_STATUS.UNAUTHORIZED
  | typeof HTTP_STATUS.NOT_FOUND
  | typeof HTTP_STATUS.CONFLICT
  | typeof HTTP_STATUS.INTERNAL_SERVER_ERROR;

type RespondProjectInvitationServiceResponseData = QueryResponseData<null> & {
  statusCode: RespondProjectInvitationStatusCodeData;
};

type ProjectsStatusCodeData =
  | typeof HTTP_STATUS.OK
  | typeof HTTP_STATUS.UNAUTHORIZED
  | typeof HTTP_STATUS.NOT_FOUND
  | typeof HTTP_STATUS.INTERNAL_SERVER_ERROR;

type ProjectsServiceResponseData = QueryResponseData<ProjectWithRoleData[]> & {
  statusCode: ProjectsStatusCodeData;
};

type ProjectByIdServiceResponseData =
  QueryResponseData<ProjectByIdResultData> & {
    statusCode: ProjectsStatusCodeData;
  };

type CreateProjectStatusCodeData =
  | typeof HTTP_STATUS.CREATED
  | typeof HTTP_STATUS.UNAUTHORIZED
  | typeof HTTP_STATUS.CONFLICT
  | typeof HTTP_STATUS.INTERNAL_SERVER_ERROR;

type CreateProjectServiceResponseData =
  QueryResponseData<CreateProjectTransactionResultData> & {
    statusCode: CreateProjectStatusCodeData;
  };

type EditProjectStatusCodeData =
  | typeof HTTP_STATUS.OK
  | typeof HTTP_STATUS.UNAUTHORIZED
  | typeof HTTP_STATUS.FORBIDDEN
  | typeof HTTP_STATUS.NOT_FOUND
  | typeof HTTP_STATUS.INTERNAL_SERVER_ERROR;

type EditProjectServiceResponseData = QueryResponseData<EditProjectResponseData> & {
  statusCode: EditProjectStatusCodeData;
};

const projectSelectFields =
  "id, name, slug, category, website_url, status, created_at, updated_at, created_by_user_id, owner_user_id";

const projectOwnerSelectFields =
  "id, name, slug, category, website_url, status, created_at, updated_at, created_by_user_id, owner_user_id";

/**
 * Input payload for creating a project.
 */
export interface CreateProjectPayloadData {
  name: string;
  slug: string;
  category?: string;
  website_url?: string;
  google_sheet_credentials: {
    google_sheet_id: string;
    google_project_id?: string;
    private_key_id?: string;
    client_email: string;
    client_id?: string;
    client_x509_cert_url?: string;
    private_key: string;
  };
  structure: {
    php_code?: string;
    json_code: Record<string, unknown>;
  };
}

/**
 * Extracts the bearer token from a raw Authorization header value.
 */
function extractBearerTokenService(
  authorizationHeaderData: string | undefined,
): string | null {
  if (
    !authorizationHeaderData ||
    !authorizationHeaderData.startsWith("Bearer ")
  ) {
    return null;
  }

  const tokenData = authorizationHeaderData.slice("Bearer ".length).trim();
  return tokenData || null;
}

/**
 * Resolves internal user ID from Supabase auth ID.
 */
async function resolveInternalUserIdByAuthIdService(
  authUserIdData: string,
): Promise<string | null> {
  const { data: userData, error: userError } = await supabase
    .from(tables.USERS)
    .select("id")
    .eq("auth_id", authUserIdData)
    .maybeSingle();

  if (userError || !userData) {
    return null;
  }

  return (userData as { id: string }).id;
}

/**
 * Validates bearer token and returns auth user ID.
 */
async function resolveAuthUserIdByTokenService(
  accessTokenData: string,
): Promise<string | null> {
  const supabaseClient = createSupabaseClientByTokenRequest(accessTokenData);
  const authUserResponseData =
    await supabaseClient.auth.getUser(accessTokenData);

  if (authUserResponseData.error || !authUserResponseData.data.user) {
    return null;
  }

  return authUserResponseData.data.user.id;
}

/**
 * Resolves internal user ID by auth ID.
 */
async function resolveUserIdByAuthIdService(
  authIdData: string,
  accessTokenData: string,
): Promise<string | null> {
  const supabaseClient = createSupabaseClientByTokenRequest(accessTokenData);

  const userResponseData = await supabaseClient
    .from(tables.USERS)
    .select("id")
    .eq("auth_id", authIdData)
    .maybeSingle();

  if (userResponseData.error || !userResponseData.data) {
    return null;
  }

  return (userResponseData.data as { id: string }).id;
}

/**
 * Checks whether the given project exists in the database.
 */
async function checkProjectExistsService(projectIdData: string): Promise<boolean | Error> {
  const projectResponseData = await supabase
    .from(tables.PROJECTS)
    .select("id")
    .eq("id", projectIdData)
    .maybeSingle();

  if (projectResponseData.error) {
    return new Error("Failed to query project");
  }

  return projectResponseData.data !== null;
}

/**
 * Fetches the project membership role for a given user.
 */
async function getProjectMemberRoleService(
  projectIdData: string,
  userIdData: string,
): Promise<"owner" | "admin" | "editor" | "viewer" | null | Error> {
  const membershipResponseData = await supabase
    .from(tables.PROJECT_USER)
    .select("role")
    .eq("project_id", projectIdData)
    .eq("user_id", userIdData)
    .maybeSingle();

  if (membershipResponseData.error) {
    return new Error("Failed to query project membership");
  }

  if (!membershipResponseData.data) {
    return null;
  }

  return membershipResponseData.data.role as "owner" | "admin" | "editor" | "viewer";
}

/**
 * Checks whether the given user is project owner or creator.
 */
async function checkIsProjectOwnerService(
  projectIdData: string,
  userIdData: string,
): Promise<boolean | Error> {
  const projectOwnershipResponseData = await supabase
    .from(tables.PROJECTS)
    .select("id")
    .eq("id", projectIdData)
    .or(`owner_user_id.eq.${userIdData},created_by_user_id.eq.${userIdData}`)
    .maybeSingle();

  if (projectOwnershipResponseData.error) {
    return new Error("Failed to query project ownership");
  }

  return Boolean(projectOwnershipResponseData.data);
}

/**
 * Performs a partial update on project fields.
 */
async function updateProjectFieldsService(
  projectIdData: string,
  payloadData: Pick<
    EditProjectPayloadData,
    "name" | "slug" | "category" | "website_url"
  >,
): Promise<EditProjectResponseData["project"] | Error> {
  const updateFieldsData: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  };

  if (payloadData.name !== undefined) {
    updateFieldsData.name = payloadData.name;
  }

  if (payloadData.slug !== undefined) {
    updateFieldsData.slug = payloadData.slug;
  }

  if (payloadData.category !== undefined) {
    updateFieldsData.category = payloadData.category;
  }

  if (payloadData.website_url !== undefined) {
    updateFieldsData.website_url = payloadData.website_url;
  }

  const updatedProjectResponseData = await supabase
    .from(tables.PROJECTS)
    .update(updateFieldsData)
    .eq("id", projectIdData)
    .select("id, name, slug, category, website_url, status, updated_at")
    .single();

  if (updatedProjectResponseData.error || !updatedProjectResponseData.data) {
    return new Error("Failed to update project");
  }

  return updatedProjectResponseData.data as EditProjectResponseData["project"];
}

/**
 * Upserts Google Sheet credentials for a project.
 */
async function upsertGoogleCredentialsService(
  projectIdData: string,
  credentialsData: NonNullable<EditProjectPayloadData["google_sheet_credentials"]>,
): Promise<EditProjectResponseData["google_sheet_credentials"] | Error> {
  const upsertResponseData = await supabase
    .from(tables.GOOGLE_SHEET_CREDENTIALS)
    .upsert(
      { ...credentialsData, project_id: projectIdData, updated_at: new Date().toISOString() },
      { onConflict: "project_id" },
    )
    .select("id, google_sheet_id, google_project_id, client_email")
    .single();

  if (upsertResponseData.error || !upsertResponseData.data) {
    return new Error("Failed to update Google Sheet credentials");
  }

  return upsertResponseData.data as EditProjectResponseData["google_sheet_credentials"];
}

/**
 * Checks if RPC error is slug conflict.
 */
function checkIsSlugConflictErrorService(errorMessageData: string): boolean {
  return errorMessageData.includes(slugConflictMarker);
}

/**
 * Checks if value is UUID.
 */
function checkIsUuidService(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value,
  );
}

/**
 * Resolves project row id from uuid or slug identifier.
 */
async function resolveProjectIdByIdentifierService(
  projectIdentifierData: string,
): Promise<string | null> {
  const isUuidIdentifier = checkIsUuidService(projectIdentifierData);

  const projectResponseData = isUuidIdentifier
    ? await supabase
        .from(tables.PROJECTS)
        .select("id")
        .eq("id", projectIdentifierData)
        .maybeSingle()
    : await supabase
        .from(tables.PROJECTS)
        .select("id")
        .eq("slug", projectIdentifierData)
        .maybeSingle();

  if (projectResponseData.error || !projectResponseData.data) {
    return null;
  }

  return (projectResponseData.data as { id: string }).id;
}

/**
 * Checks whether the given user has access to the given project.
 */
async function checkProjectAccessService(
  projectIdData: string,
  internalUserIdData: string,
): Promise<boolean> {
  const { data: projectMembershipItem, error: projectMembershipError } =
    await supabase
      .from(tables.PROJECT_USER)
      .select("project_id")
      .eq("project_id", projectIdData)
      .eq("user_id", internalUserIdData)
      .maybeSingle();

  if (projectMembershipError) {
    logger.error(
      "[projects.service] failed to verify project membership access",
      projectMembershipError,
    );
    return false;
  }

  if (projectMembershipItem) {
    return true;
  }

  const { data: ownedProjectItem, error: ownedProjectError } = await supabase
    .from(tables.PROJECTS)
    .select("id")
    .eq("id", projectIdData)
    .or(
      [
        `owner_user_id.eq.${internalUserIdData}`,
        `created_by_user_id.eq.${internalUserIdData}`,
      ].join(","),
    )
    .maybeSingle();

  if (ownedProjectError) {
    logger.error(
      "[projects.service] failed to verify owned project access",
      ownedProjectError,
    );
    return false;
  }

  return Boolean(ownedProjectItem);
}

/**
 * Checks whether an invitation has already expired.
 */
function checkIsInvitationExpiredService(
  invitationExpiresAtData: string | null,
): boolean {
  if (!invitationExpiresAtData) {
    return false;
  }

  return new Date(invitationExpiresAtData).getTime() <= Date.now();
}

/**
 * Fetches all active members of a project from project_user joined with users.
 */
async function fetchProjectUsersService(
  projectIdData: string,
): Promise<ProjectUserData[] | null> {
  const { data, error } = await supabase
    .from(tables.PROJECT_USER)
    .select("role, users(id, email, full_name, status)")
    .eq("project_id", projectIdData);

  if (error) {
    logger.error("[projects.service] failed to fetch project users", error);
    return null;
  }

  return (data ?? []).map(
    (rowItem: {
      role: string;
      users:
        | {
            id: string;
            email: string;
            full_name: string | null;
            status: string;
          }[]
        | null;
    }) => {
      const userRowData = Array.isArray(rowItem.users)
        ? rowItem.users[0]
        : rowItem.users;

      return {
        id: userRowData?.id ?? "",
        email: userRowData?.email ?? "",
        full_name: userRowData?.full_name ?? null,
        role: rowItem.role as ProjectUserData["role"],
        status: (userRowData?.status ?? "active") as ProjectUserData["status"],
      };
    },
  );
}

/**
 * Fetches all pending invitations for a project from project_invitations joined with users.
 */
async function fetchPendingInvitationsService(
  projectIdData: string,
): Promise<ProjectPendingInvitationData[] | null> {
  const { data, error } = await supabase
    .from(tables.PROJECT_INVITATIONS)
    .select("id, role, status, invited_user_id")
    .eq("project_id", projectIdData)
    .eq("status", "pending");

  if (error) {
    logger.error(
      "[projects.service] failed to fetch pending invitations",
      error,
    );
    return null;
  }

  const invitationItemsData = (data ?? []) as {
    id: string;
    role: string;
    status: string;
    invited_user_id: string | null;
  }[];

  const invitedUserIdItemsData = invitationItemsData
    .map((invitationItemData) => invitationItemData.invited_user_id)
    .filter((invitedUserIdData): invitedUserIdData is string => {
      return Boolean(invitedUserIdData);
    });

  const invitedUserEmailMapData = new Map<string, string>();

  if (invitedUserIdItemsData.length > 0) {
    const { data: invitedUserItemsData, error: invitedUserItemsError } =
      await supabase
        .from(tables.USERS)
        .select("id, email")
        .in("id", invitedUserIdItemsData);

    if (invitedUserItemsError) {
      logger.error(
        "[projects.service] failed to fetch invited user emails",
        invitedUserItemsError,
      );
      return null;
    }

    (invitedUserItemsData ?? []).forEach((invitedUserItemData) => {
      invitedUserEmailMapData.set(
        invitedUserItemData.id,
        invitedUserItemData.email,
      );
    });
  }

  return invitationItemsData.map((invitationItemData) => {
    const invitationEmailData = invitationItemData.invited_user_id
      ? (invitedUserEmailMapData.get(invitationItemData.invited_user_id) ?? "")
      : "";

    return {
      id: invitationItemData.id,
      email: invitationEmailData,
      role: invitationItemData.role as ProjectPendingInvitationData["role"],
      status: "pending",
    };
  });
}

/**
 * Fetches all active project members and pending invitations for a project.
 */
export async function getAllProjectUsersService(
  projectIdData: string,
  authorizationHeaderData: string | undefined,
): Promise<GetAllProjectUsersServiceResponseData> {
  const accessTokenData = extractBearerTokenService(authorizationHeaderData);

  if (!accessTokenData) {
    return {
      data: null,
      error: new Error("Authorization header must contain a bearer token."),
      statusCode: HTTP_STATUS.UNAUTHORIZED,
    };
  }

  const authUserIdData = await resolveAuthUserIdByTokenService(accessTokenData);

  if (!authUserIdData) {
    return {
      data: null,
      error: new Error("Invalid or expired access token."),
      statusCode: HTTP_STATUS.UNAUTHORIZED,
    };
  }

  const internalUserIdData = await resolveUserIdByAuthIdService(
    authUserIdData,
    accessTokenData,
  );

  if (!internalUserIdData) {
    return {
      data: null,
      error: new Error("Authenticated user not found."),
      statusCode: HTTP_STATUS.UNAUTHORIZED,
    };
  }

  const projectExistsResponseData = await supabase
    .from(tables.PROJECTS)
    .select("id")
    .eq("id", projectIdData)
    .maybeSingle();

  if (projectExistsResponseData.error) {
    logger.error(
      "[projects.service] failed to verify project existence",
      projectExistsResponseData.error,
    );
    return {
      data: null,
      error: new Error("Failed to fetch project users."),
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    };
  }

  if (!projectExistsResponseData.data) {
    return {
      data: null,
      error: new Error("Project not found"),
      statusCode: HTTP_STATUS.NOT_FOUND,
    };
  }

  const hasProjectAccessData = await checkProjectAccessService(
    projectIdData,
    internalUserIdData,
  );

  if (!hasProjectAccessData) {
    return {
      data: null,
      error: new Error("You do not have access to this project."),
      statusCode: HTTP_STATUS.FORBIDDEN,
    };
  }

  const [projectUsersData, pendingInvitationsData] = await Promise.all([
    fetchProjectUsersService(projectIdData),
    fetchPendingInvitationsService(projectIdData),
  ]);

  if (projectUsersData === null || pendingInvitationsData === null) {
    return {
      data: null,
      error: new Error("Failed to fetch project users."),
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    };
  }

  return {
    data: {
      users: projectUsersData,
      invitations: pendingInvitationsData,
    },
    error: null,
    statusCode: HTTP_STATUS.OK,
  };
}

/**
 * Invites an existing user to a project by creating a pending invitation record.
 */
export async function inviteUserToProjectService(
  accessTokenData: string,
  projectIdData: string,
  emailData: string,
): Promise<InviteUserServiceResponseData> {
  try {
    const supabaseClient = createSupabaseClientByTokenRequest(accessTokenData);
    const inviterAuthUserIdData =
      await resolveAuthUserIdByTokenService(accessTokenData);

    if (!inviterAuthUserIdData) {
      return {
        data: null,
        error: new Error("Invalid or expired access token."),
        statusCode: HTTP_STATUS.UNAUTHORIZED,
      };
    }

    const inviterUserIdData = await resolveUserIdByAuthIdService(
      inviterAuthUserIdData,
      accessTokenData,
    );

    if (!inviterUserIdData) {
      return {
        data: null,
        error: new Error("Authenticated user not found."),
        statusCode: HTTP_STATUS.UNAUTHORIZED,
      };
    }

    const hasProjectAccessData = await checkProjectAccessService(
      projectIdData,
      inviterUserIdData,
    );

    if (!hasProjectAccessData) {
      return {
        data: null,
        error: new Error("You do not have access to this project."),
        statusCode: HTTP_STATUS.UNAUTHORIZED,
      };
    }

    const existingUserResponseData = await supabaseClient
      .from(tables.USERS)
      .select("id")
      .eq("email", emailData)
      .maybeSingle();

    if (existingUserResponseData.error) {
      logger.error(
        "[projects.service] failed to fetch user by email",
        existingUserResponseData.error,
      );
      return {
        data: null,
        error: new Error("Failed to look up invited user."),
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      };
    }

    if (!existingUserResponseData.data) {
      return {
        data: null,
        error: new Error("User does not exist"),
        statusCode: HTTP_STATUS.NOT_FOUND,
      };
    }

    const invitedUserIdData = existingUserResponseData.data.id as string;

    const createdInvitationResponseData = await supabaseClient
      .from(tables.PROJECT_INVITATIONS)
      .insert({
        project_id: projectIdData,
        invited_user_id: invitedUserIdData,
        invited_by_user_id: inviterUserIdData,
        role: "viewer",
        status: "pending",
        expires_at: new Date(
          Date.now() + 7 * 24 * 60 * 60 * 1000,
        ).toISOString(),
      })
      .select("id, project_id, invited_user_id, role, status, expires_at")
      .single();

    if (
      createdInvitationResponseData.error ||
      !createdInvitationResponseData.data
    ) {
      logger.error(
        "[projects.service] failed to create project invitation",
        createdInvitationResponseData.error,
      );
      return {
        data: null,
        error: new Error("Failed to create project invitation."),
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      };
    }

    const invitationData = createdInvitationResponseData.data as Pick<
      ProjectInvitationData,
      "id" | "project_id" | "invited_user_id" | "role" | "status" | "expires_at"
    >;

    return {
      data: invitationData,
      error: null,
      statusCode: HTTP_STATUS.OK,
    };
  } catch (errorData: unknown) {
    logger.error("[projects.service] unexpected error", errorData);
    return {
      data: null,
      error: new Error("Failed to invite user to project."),
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    };
  }
}

/**
 * Fetches pending project invitations for authenticated user.
 */
export async function getMyProjectInvitationsService(
  authUserIdData: string,
): Promise<GetMyProjectInvitationsServiceResponseData> {
  try {
    const internalUserIdData =
      await resolveInternalUserIdByAuthIdService(authUserIdData);

    if (!internalUserIdData) {
      return {
        data: null,
        error: new Error("Authenticated user not found."),
        statusCode: HTTP_STATUS.UNAUTHORIZED,
      };
    }

    const { data: invitationItemsData, error: invitationItemsError } =
      await supabase
        .from(tables.PROJECT_INVITATIONS)
        .select(
          "id, project_id, invited_by_user_id, role, status, expires_at, created_at",
        )
        .eq("invited_user_id", internalUserIdData)
        .eq("status", "pending")
        .order("created_at", { ascending: false });

    if (invitationItemsError) {
      logger.error(
        "[projects.service] failed to fetch user pending invitations",
        invitationItemsError,
      );
      return {
        data: null,
        error: new Error("Failed to fetch pending invitations."),
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      };
    }

    const filteredInvitationItemsData = (invitationItemsData ?? []).filter(
      (invitationItemData) => {
        return !checkIsInvitationExpiredService(invitationItemData.expires_at);
      },
    );

    if (filteredInvitationItemsData.length === 0) {
      return {
        data: {
          invitations: [],
        },
        error: null,
        statusCode: HTTP_STATUS.OK,
      };
    }

    const projectIdItemsData = Array.from(
      new Set(
        filteredInvitationItemsData.map((invitationItemData) => {
          return invitationItemData.project_id;
        }),
      ),
    );
    const inviterIdItemsData = Array.from(
      new Set(
        filteredInvitationItemsData.map((invitationItemData) => {
          return invitationItemData.invited_by_user_id;
        }),
      ),
    );

    const [projectItemsResponseData, inviterItemsResponseData] =
      await Promise.all([
        supabase
          .from(tables.PROJECTS)
          .select("id, name, slug")
          .in("id", projectIdItemsData),
        supabase
          .from(tables.USERS)
          .select("id, full_name, email")
          .in("id", inviterIdItemsData),
      ]);

    if (projectItemsResponseData.error || inviterItemsResponseData.error) {
      logger.error("[projects.service] failed to map invitation metadata", {
        projectError: projectItemsResponseData.error,
        inviterError: inviterItemsResponseData.error,
      });
      return {
        data: null,
        error: new Error("Failed to fetch pending invitations."),
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      };
    }

    const projectMapData = new Map<
      string,
      {
        name: string;
        slug: string;
      }
    >();
    (projectItemsResponseData.data ?? []).forEach((projectItemData) => {
      projectMapData.set(projectItemData.id, {
        name: projectItemData.name,
        slug: projectItemData.slug,
      });
    });

    const inviterMapData = new Map<
      string,
      {
        full_name: string | null;
        email: string;
      }
    >();
    (inviterItemsResponseData.data ?? []).forEach((inviterItemData) => {
      inviterMapData.set(inviterItemData.id, {
        full_name: inviterItemData.full_name,
        email: inviterItemData.email,
      });
    });

    const mappedInvitationItemsData: ProjectInboxInvitationData[] =
      filteredInvitationItemsData
        .map((invitationItemData) => {
          const projectItemData = projectMapData.get(
            invitationItemData.project_id,
          );
          const inviterItemData = inviterMapData.get(
            invitationItemData.invited_by_user_id,
          );

          if (!projectItemData || !inviterItemData) {
            return null;
          }

          return {
            id: invitationItemData.id,
            project_id: invitationItemData.project_id,
            project_name: projectItemData.name,
            project_slug: projectItemData.slug,
            invited_by_user_id: invitationItemData.invited_by_user_id,
            invited_by_name: inviterItemData.full_name,
            invited_by_email: inviterItemData.email,
            role: invitationItemData.role as ProjectInboxInvitationData["role"],
            status: "pending",
            expires_at: invitationItemData.expires_at,
            created_at: invitationItemData.created_at,
          };
        })
        .filter(
          (
            invitationItemData,
          ): invitationItemData is ProjectInboxInvitationData => {
            return Boolean(invitationItemData);
          },
        );

    return {
      data: {
        invitations: mappedInvitationItemsData,
      },
      error: null,
      statusCode: HTTP_STATUS.OK,
    };
  } catch (errorData: unknown) {
    logger.error(
      "[projects.service] unexpected error while fetching pending invitations",
      errorData,
    );
    return {
      data: null,
      error: new Error("Failed to fetch pending invitations."),
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    };
  }
}

/**
 * Accepts or rejects a pending invitation for authenticated user.
 */
export async function respondProjectInvitationService(
  authUserIdData: string,
  accessTokenData: string,
  invitationIdData: string,
  actionData: "accept" | "reject",
): Promise<RespondProjectInvitationServiceResponseData> {
  try {
    const internalUserIdData =
      await resolveInternalUserIdByAuthIdService(authUserIdData);

    if (!internalUserIdData) {
      return {
        data: null,
        error: new Error("Authenticated user not found."),
        statusCode: HTTP_STATUS.UNAUTHORIZED,
      };
    }

    const supabaseClient = createSupabaseClientByTokenRequest(accessTokenData);
    const invitationResponseData = await supabaseClient
      .from(tables.PROJECT_INVITATIONS)
      .select("id, project_id, invited_user_id, role, status, expires_at")
      .eq("id", invitationIdData)
      .maybeSingle();

    if (invitationResponseData.error) {
      logger.error("[projects.service] failed to fetch invitation by id", {
        invitationIdData,
        error: invitationResponseData.error,
      });
      return {
        data: null,
        error: new Error("Failed to process invitation."),
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      };
    }

    if (!invitationResponseData.data) {
      return {
        data: null,
        error: new Error("Invitation not found."),
        statusCode: HTTP_STATUS.NOT_FOUND,
      };
    }

    if (invitationResponseData.data.invited_user_id !== internalUserIdData) {
      return {
        data: null,
        error: new Error("You are not allowed to respond to this invitation."),
        statusCode: HTTP_STATUS.UNAUTHORIZED,
      };
    }

    if (invitationResponseData.data.status !== "pending") {
      return {
        data: null,
        error: new Error("Invitation is already processed."),
        statusCode: HTTP_STATUS.CONFLICT,
      };
    }

    if (
      checkIsInvitationExpiredService(
        invitationResponseData.data.expires_at ?? null,
      )
    ) {
      return {
        data: null,
        error: new Error("Invitation has expired."),
        statusCode: HTTP_STATUS.CONFLICT,
      };
    }

    if (actionData === "accept") {
      const projectMembershipResponseData = await supabaseClient
        .from(tables.PROJECT_USER)
        .upsert(
          {
            project_id: invitationResponseData.data.project_id,
            user_id: internalUserIdData,
            role: invitationResponseData.data.role,
          },
          { onConflict: "project_id,user_id" },
        )
        .select("id")
        .single();

      if (projectMembershipResponseData.error) {
        logger.error("[projects.service] failed to upsert project membership", {
          invitationIdData,
          error: projectMembershipResponseData.error,
        });
        return {
          data: null,
          error: new Error("Failed to process invitation."),
          statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        };
      }
    }

    const invitationStatusData =
      actionData === "accept" ? "accepted" : "rejected";
    const invitationUpdateResponseData = await supabaseClient
      .from(tables.PROJECT_INVITATIONS)
      .update({
        status: invitationStatusData,
        responded_at: new Date().toISOString(),
      })
      .eq("id", invitationIdData)
      .select("id")
      .single();

    if (invitationUpdateResponseData.error) {
      logger.error("[projects.service] failed to update invitation status", {
        invitationIdData,
        error: invitationUpdateResponseData.error,
      });
      return {
        data: null,
        error: new Error("Failed to process invitation."),
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      };
    }

    return {
      data: null,
      error: null,
      statusCode: HTTP_STATUS.OK,
    };
  } catch (errorData: unknown) {
    logger.error(
      "[projects.service] unexpected error while responding invitation",
      {
        invitationIdData,
        error: errorData,
      },
    );
    return {
      data: null,
      error: new Error("Failed to process invitation."),
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    };
  }
}

/**
 * Fetches all projects accessible to authenticated user.
 */
export async function getAllProjectsService(
  authUserIdData: string,
): Promise<ProjectsServiceResponseData> {
  try {
    const internalUserIdData =
      await resolveInternalUserIdByAuthIdService(authUserIdData);

    if (!internalUserIdData) {
      return {
        data: null,
        error: new Error("Authenticated user not found."),
        statusCode: HTTP_STATUS.UNAUTHORIZED,
      };
    }

    const { data: projectMembershipItems, error: projectMembershipError } =
      await supabase
        .from(tables.PROJECT_USER)
        .select(`role, projects:${tables.PROJECTS}(${projectSelectFields})`)
        .eq("user_id", internalUserIdData)
        .order(`${tables.PROJECTS}(created_at)`, { ascending: false });

    if (projectMembershipError) {
      logger.error(
        "[projects.service] failed to fetch project memberships",
        projectMembershipError,
      );
      return {
        data: null,
        error: new Error("Failed to fetch projects."),
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      };
    }

    const projectItems: ProjectWithRoleData[] = (
      projectMembershipItems ?? []
    ).map((membershipItem) => {
      const projectRecord = membershipItem.projects as unknown as ProjectData;

      return {
        id: projectRecord.id,
        name: projectRecord.name,
        slug: projectRecord.slug,
        category: projectRecord.category,
        website_url: projectRecord.website_url,
        status: projectRecord.status,
        created_at: projectRecord.created_at,
        updated_at: projectRecord.updated_at,
        created_by_user_id: projectRecord.created_by_user_id,
        owner_user_id: projectRecord.owner_user_id,
        role: membershipItem.role as "owner" | "admin" | "editor" | "viewer",
      };
    });

    if (projectItems.length > 0) {
      return {
        data: projectItems,
        error: null,
        statusCode: HTTP_STATUS.OK,
      };
    }

    const { data: ownedProjectItems, error: ownedProjectError } = await supabase
      .from(tables.PROJECTS)
      .select(projectOwnerSelectFields)
      .eq("owner_user_id", internalUserIdData)
      .order("created_at", { ascending: false });

    if (ownedProjectError) {
      logger.error(
        "[projects.service] failed to fetch owned projects fallback",
        ownedProjectError,
      );
      return {
        data: null,
        error: new Error("Failed to fetch projects."),
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      };
    }

    const ownedProjectWithRoleItems: ProjectWithRoleData[] = (
      ownedProjectItems ?? []
    ).map((projectItem) => ({
      id: projectItem.id,
      name: projectItem.name,
      slug: projectItem.slug,
      category: projectItem.category,
      website_url: projectItem.website_url,
      status: projectItem.status,
      created_at: projectItem.created_at,
      updated_at: projectItem.updated_at,
      created_by_user_id: projectItem.created_by_user_id,
      owner_user_id: projectItem.owner_user_id,
      role: "owner",
    }));

    return {
      data: ownedProjectWithRoleItems,
      error: null,
      statusCode: HTTP_STATUS.OK,
    };
  } catch {
    logger.error("[projects.service] unexpected error while fetching projects");
    return {
      data: null,
      error: new Error("Internal server error"),
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    };
  }
}

/**
 * Fetches one accessible project by project ID.
 */
export async function getProjectByIdService(
  authUserIdData: string,
  projectIdentifierData: string,
): Promise<ProjectByIdServiceResponseData> {
  try {
    const internalUserIdData =
      await resolveInternalUserIdByAuthIdService(authUserIdData);

    if (!internalUserIdData) {
      return {
        data: null,
        error: new Error("Authenticated user not found."),
        statusCode: HTTP_STATUS.UNAUTHORIZED,
      };
    }

    const projectIdData = await resolveProjectIdByIdentifierService(
      projectIdentifierData,
    );

    if (!projectIdData) {
      return {
        data: null,
        error: new Error("Project not found."),
        statusCode: HTTP_STATUS.NOT_FOUND,
      };
    }

    const hasProjectAccessData = await checkProjectAccessService(
      projectIdData,
      internalUserIdData,
    );

    if (!hasProjectAccessData) {
      return {
        data: null,
        error: new Error("Unauthorized"),
        statusCode: HTTP_STATUS.UNAUTHORIZED,
      };
    }

    const { data: projectItem, error: projectError } = await supabase
      .from(tables.PROJECTS)
      .select(
        "id, name, slug, category, website_url, status, google_sheet_credentials(id, google_sheet_id, google_project_id, client_email, private_key_id, client_id, client_x509_cert_url, private_key), project_structure_versions(id, version, is_current, json_code, php_code)",
      )
      .eq("id", projectIdData)
      .eq("project_structure_versions.is_current", true)
      .maybeSingle();

    if (projectError) {
      logger.error(
        "[projects.service] failed to fetch project by id",
        projectError,
      );
      return {
        data: null,
        error: new Error("Failed to fetch project."),
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      };
    }

    if (!projectItem) {
      return {
        data: null,
        error: new Error("Project not found."),
        statusCode: HTTP_STATUS.NOT_FOUND,
      };
    }

    const structureVersionItem = Array.isArray(
      projectItem.project_structure_versions,
    )
      ? projectItem.project_structure_versions[0]
      : null;
    const credentialsItem = Array.isArray(projectItem.google_sheet_credentials)
      ? projectItem.google_sheet_credentials[0]
      : projectItem.google_sheet_credentials;

    if (!structureVersionItem || !credentialsItem) {
      return {
        data: null,
        error: new Error("Project data is incomplete."),
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      };
    }

    return {
      data: {
        project: {
          id: projectItem.id,
          name: projectItem.name,
          slug: projectItem.slug,
          category: projectItem.category,
          website_url: projectItem.website_url,
          status: projectItem.status,
          structure: {
            current_version: {
              id: structureVersionItem.id,
              version: structureVersionItem.version,
              is_current: structureVersionItem.is_current,
              json_code: structureVersionItem.json_code,
              php_code: structureVersionItem.php_code,
            },
          },
          google_sheet_credentials: {
            id: credentialsItem.id,
            google_sheet_id: credentialsItem.google_sheet_id,
            google_project_id: credentialsItem.google_project_id,
            client_email: credentialsItem.client_email,
            private_key_id: credentialsItem.private_key_id,
            client_id: credentialsItem.client_id,
            client_x509_cert_url: credentialsItem.client_x509_cert_url,
            private_key: credentialsItem.private_key,
          },
        },
      },
      error: null,
      statusCode: HTTP_STATUS.OK,
    };
  } catch (errorData: unknown) {
    logger.error(
      "[projects.service] unexpected error while fetching project",
      errorData,
    );
    return {
      data: null,
      error: new Error("Failed to fetch project."),
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    };
  }
}

/**
 * Creates project transaction using RPC.
 */
export async function createProjectService(
  payloadData: CreateProjectPayloadData,
  accessTokenData: string,
): Promise<CreateProjectServiceResponseData> {
  try {
    const authIdData = await resolveAuthUserIdByTokenService(accessTokenData);

    if (!authIdData) {
      return {
        data: null,
        error: new Error("Invalid or expired access token."),
        statusCode: HTTP_STATUS.UNAUTHORIZED,
      };
    }

    const userIdData = await resolveUserIdByAuthIdService(
      authIdData,
      accessTokenData,
    );

    if (!userIdData) {
      return {
        data: null,
        error: new Error("Authenticated user not found."),
        statusCode: HTTP_STATUS.UNAUTHORIZED,
      };
    }

    const supabaseClient = createSupabaseClientByTokenRequest(accessTokenData);

    const rpcResponseData = await supabaseClient.rpc(
      rpcFunctions.CREATE_PROJECT_TRANSACTION,
      {
        p_name: payloadData.name,
        p_category: payloadData.category ?? "web-app",
        p_website_url: payloadData.website_url ?? null,
        p_slug: payloadData.slug,
        p_user_id: userIdData,
        p_google_sheet_id: payloadData.google_sheet_credentials.google_sheet_id,
        p_google_project_id:
          payloadData.google_sheet_credentials.google_project_id ?? null,
        p_private_key_id:
          payloadData.google_sheet_credentials.private_key_id ?? null,
        p_client_email: payloadData.google_sheet_credentials.client_email,
        p_client_id: payloadData.google_sheet_credentials.client_id ?? null,
        p_client_x509_cert_url:
          payloadData.google_sheet_credentials.client_x509_cert_url ?? null,
        p_private_key: payloadData.google_sheet_credentials.private_key,
        p_php_code: payloadData.structure.php_code ?? null,
        p_json_code: payloadData.structure.json_code,
      },
    );

    if (rpcResponseData.error) {
      const errorMessageData = rpcResponseData.error.message ?? "";

      if (checkIsSlugConflictErrorService(errorMessageData)) {
        return {
          data: null,
          error: new Error("Slug already exists"),
          statusCode: HTTP_STATUS.CONFLICT,
        };
      }

      logger.error("[projects.service] RPC create_project_transaction failed", {
        message: errorMessageData,
      });

      return {
        data: null,
        error: new Error("Failed to create project."),
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      };
    }

    const resultData =
      rpcResponseData.data as CreateProjectTransactionResultData;

    return {
      data: resultData,
      error: null,
      statusCode: HTTP_STATUS.CREATED,
    };
  } catch (errorData: unknown) {
    logger.error("[projects.service] unexpected error", errorData);
    return {
      data: null,
      error: new Error("Failed to create project."),
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    };
  }
}

/**
 * Partially updates a project and optionally upserts Google Sheet credentials.
 */
export async function editProjectService(
  projectIdData: string,
  authIdData: string,
  payloadData: EditProjectPayloadData,
): Promise<EditProjectServiceResponseData> {
  try {
    const userIdData = await resolveInternalUserIdByAuthIdService(authIdData);

    if (!userIdData) {
      return {
        data: null,
        error: new Error("Authenticated user not found"),
        statusCode: HTTP_STATUS.UNAUTHORIZED,
      };
    }

    const projectExistsData = await checkProjectExistsService(projectIdData);

    if (projectExistsData instanceof Error) {
      logger.error("[projects.service] failed to check project existence", projectExistsData);
      return {
        data: null,
        error: new Error("Failed to verify project"),
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      };
    }

    if (!projectExistsData) {
      return {
        data: null,
        error: new Error("Project not found"),
        statusCode: HTTP_STATUS.NOT_FOUND,
      };
    }

    const memberRoleData = await getProjectMemberRoleService(projectIdData, userIdData);
    const isProjectOwnerData = await checkIsProjectOwnerService(
      projectIdData,
      userIdData,
    );

    if (memberRoleData instanceof Error) {
      logger.error("[projects.service] failed to check project membership", memberRoleData);
      return {
        data: null,
        error: new Error("Failed to verify project membership"),
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      };
    }

    if (isProjectOwnerData instanceof Error) {
      logger.error("[projects.service] failed to check project ownership", isProjectOwnerData);
      return {
        data: null,
        error: new Error("Failed to verify project ownership"),
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      };
    }

    const checkHasEditPermissionData =
      isProjectOwnerData ||
      (memberRoleData !== null && ["owner", "admin"].includes(memberRoleData));

    if (!checkHasEditPermissionData) {
      return {
        data: null,
        error: new Error("You do not have permission to update this project"),
        statusCode: HTTP_STATUS.FORBIDDEN,
      };
    }

    const { google_sheet_credentials: googleCredentialsData, ...projectFieldsData } =
      payloadData;
    const updatedProjectData = await updateProjectFieldsService(
      projectIdData,
      projectFieldsData,
    );

    if (updatedProjectData instanceof Error) {
      logger.error("[projects.service] failed to update project fields", updatedProjectData);
      return {
        data: null,
        error: new Error("Failed to update project"),
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      };
    }

    let updatedCredentialsData: EditProjectResponseData["google_sheet_credentials"] =
      null;

    if (googleCredentialsData) {
      const credentialsResultData = await upsertGoogleCredentialsService(
        projectIdData,
        googleCredentialsData,
      );

      if (credentialsResultData instanceof Error) {
        logger.error(
          "[projects.service] failed to upsert Google Sheet credentials",
          credentialsResultData,
        );
        return {
          data: null,
          error: new Error("Failed to update Google Sheet credentials"),
          statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        };
      }

      updatedCredentialsData = credentialsResultData;
    }

    return {
      data: {
        project: updatedProjectData,
        google_sheet_credentials: updatedCredentialsData,
      },
      error: null,
      statusCode: HTTP_STATUS.OK,
    };
  } catch (errorData: unknown) {
    logger.error("[projects.service] unexpected error", errorData);
    return {
      data: null,
      error: new Error("Failed to update project"),
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    };
  }
}
