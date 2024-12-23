import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { getEvents, type Event } from '@/api/events';
import { useToast } from '@/hooks/useToast';
import { Loading } from '@/components/Loading';
import { format } from 'date-fns';

export function Calendar() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await getEvents();
      setEvents(response.events);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to fetch events",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const calendarEvents = events.map(event => ({
    id: event._id,
    title: event.name,
    start: new Date(event.date),
    end: new Date(event.date),
    extendedProps: {
      description: event.description,
      location: event.location,
      attendees: event.attendees,
      tasks: event.tasks,
    },
    allDay: true,
  }));

  const handleEventClick = (info: any) => {
    navigate(`/events/${info.event.id}`);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
      <div className="rounded-md border bg-background p-4">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={calendarEvents}
          eventClick={handleEventClick}
          height="auto"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek'
          }}
          eventContent={(arg) => (
            <div className="p-1">
              <div className="font-semibold">{arg.event.title}</div>
              <div className="text-sm text-muted-foreground">
                {arg.event.extendedProps.location}
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
}