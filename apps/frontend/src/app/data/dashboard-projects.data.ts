// TYPES //
import type { DashboardProjectData } from "@/types/projects";

// CONSTANTS //
import { ROUTES } from "@/app/constants/routes";

/**
 * Provides the dashboard project card data used by the current mock dashboard
 */
export const dashboardProjectData: DashboardProjectData[] = [
  {
    badgeName: "Mohd Hussain",
    href: ROUTES.APP.PROJECTS.DETAIL("neelsiddhi-website"),
    backgroundClassName: "bg-blue-100",
    iconColorClassName: "text-blue-400",
    id: "neelsiddhi-website",
    lastSyncLabel: "Last Sync: 2 hours ago",
    title: "Neelsiddhi Website",
  },
  {
    badgeName: "Danish Jain",
    href: ROUTES.APP.PROJECTS.DETAIL("ecommerce-demo-green"),
    backgroundClassName: "bg-green-100",
    iconColorClassName: "text-green-400",
    id: "ecommerce-demo-green",
    lastSyncLabel: "Last Sync: 2 hours ago",
    title: "Ecommerce Demo",
  },
  {
    badgeName: "Danish Ahuja",
    href: ROUTES.APP.PROJECTS.DETAIL("ecommerce-demo-orange"),
    backgroundClassName: "bg-orange-100",
    iconColorClassName: "text-orange-400",
    id: "ecommerce-demo-orange",
    lastSyncLabel: "Last Sync: 5 hours ago",
    title: "Ecommerce Demo",
  },
];
