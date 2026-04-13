// TYPES //
import type { UserRoleData, UserData } from "@/types/user";

// COMPONENTS //
import VerticalMenu from "@/components/icons/neevo-icons/VerticalMenu";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// OTHERS //
import { cn } from "@/lib/utils";

interface UsersTablePropsData {
  memberItems: UserData[];
}

const statusDotToneClassNameMap: Partial<Record<UserData["status"], string>> = {
  active: "bg-success-500",
  inactive: "bg-n-300",
};

/**
 * Renders the user access members table with desktop and mobile variants
 */
export default function UsersTable({ memberItems }: UsersTablePropsData) {
  // Define Navigation

  // Define Context

  // Define Refs

  // Define States

  // Helper Functions
  /**
   * Returns the status dot tone for mobile member rows
   */
  const getStatusDotToneClassName = (status: UserData["status"]): string => {
    return statusDotToneClassNameMap[status] ?? "bg-n-300";
  };

  /**
   * Formats the member status into title case text
   */
  const getMemberStatusLabel = (status: UserData["status"]): string => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  /**
   * Returns a fallback-safe role label for a user row
   */
  const getMemberRoleLabel = (role?: UserRoleData): UserRoleData => {
    return role ?? "Member";
  };

  // Use Effects

  return (
    <div className="flex w-full flex-col gap-3.5">
      <h2 className="text-sm font-medium text-n-950 md:text-lg">
        Current Access Members
      </h2>

      <div className="overflow-hidden rounded-3xl border border-n-200 bg-n-50 md:border">
        <Table className="table-fixed border-collapse md:table-auto">
          <TableHeader className="hidden md:table-header-group">
            <TableRow className="border-b border-n-100 hover:bg-n-50">
              <TableHead className="h-auto whitespace-nowrap px-3 py-3 text-left text-sm font-normal text-n-700 md:px-6 md:py-4">
                User
              </TableHead>
              <TableHead className="hidden h-auto px-6 py-4 text-center text-sm font-normal text-n-700 md:table-cell">
                Roles
              </TableHead>
              <TableHead className="hidden h-auto px-6 py-4 text-center text-sm font-normal text-n-700 md:table-cell">
                Status
              </TableHead>
              <TableHead className="h-auto w-12 px-3 py-3 text-right text-sm font-normal text-n-700 md:w-auto md:px-6 md:py-4 md:text-center">
                <span className="sr-only md:not-sr-only">Action</span>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {memberItems.map((memberItem) => (
              <TableRow
                key={memberItem.id}
                className="border-b border-n-300 last:border-b-0 md:border-n-100"
              >
                <TableCell className="px-3 py-3 md:px-6 md:py-4">
                  <div className="flex min-w-0 items-center gap-1.5 md:gap-5">
                    <div className="relative size-10 shrink-0 rounded-full bg-n-100">
                      <span
                        className={cn(
                          "absolute -bottom-0.5 -right-0.5 size-[11px] rounded-full border-2 border-n-50 md:hidden",
                          getStatusDotToneClassName(memberItem.status),
                        )}
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-base font-medium leading-normal text-n-950 md:text-lg">
                        {memberItem.full_name}
                      </p>
                      <p className="truncate text-xs text-n-700 md:text-sm">
                        {memberItem.email}
                      </p>
                    </div>

                    <span className="ml-auto inline-flex shrink-0 rounded-full px-2 py-1 text-[10px] font-medium md:hidden bg-green-50 text-green-700">
                      {getMemberRoleLabel(memberItem.role)}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="hidden px-6 py-4 text-center md:table-cell">
                  <span className="inline-flex rounded-full px-2 py-1 text-xs font-medium bg-green-50 text-green-700">
                    {getMemberRoleLabel(memberItem.role)}
                  </span>
                </TableCell>

                <TableCell className="hidden px-6 py-4 text-center text-sm text-n-700 md:table-cell">
                  {getMemberStatusLabel(memberItem.status)}
                </TableCell>

                <TableCell className="w-12 px-3 py-3 text-right md:w-auto md:px-6 md:py-4 md:text-center">
                  <Button
                    type="button"
                    className="hidden h-8 rounded-xl bg-blue-500 px-4 text-xs font-bold text-n-50 hover:bg-blue-600 active:bg-blue-500 md:inline-flex"
                  >
                    Show Menu
                  </Button>

                  <button
                    type="button"
                    className="inline-flex size-5 shrink-0 items-center justify-center rounded text-n-400 md:hidden"
                    aria-label={`Open actions for ${memberItem.full_name ?? "user"}`}
                  >
                    <VerticalMenu
                      primaryColor="var(--color-n-400)"
                      className="size-5"
                    />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
