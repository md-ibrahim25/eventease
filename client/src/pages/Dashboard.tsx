import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Users, CheckSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { getEvents } from "@/api/events";
import type { Event } from "@/api/events";

export function Dashboard() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getEvents();
        setEvents(response.events);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const stats = [
    {
      title: "Total Events",
      value: events.length,
      icon: CalendarDays,
    },
    {
      title: "Total Attendees",
      value: [...new Set(events.flatMap(event => event.attendees))].length,
      icon: Users,
    },
    {
      title: "Total Tasks",
      value: events.reduce((acc, event) => acc + event.tasks.length, 0),
      icon: CheckSquare,
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}