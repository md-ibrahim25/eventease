import { Calendar, CalendarDays } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const links = [
    { to: "/events", icon: CalendarDays, label: "Events" },
    { to: "/calendar", icon: Calendar, label: "Calendar" },
  ];

  return (
    <div className="pb-12 min-h-screen">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    "flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                    isActive ? "bg-accent" : "transparent"
                  )
                }
              >
                <link.icon className="mr-2 h-4 w-4" />
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}