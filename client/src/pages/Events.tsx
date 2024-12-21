import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { getEvents, type Event } from "@/api/events"
import { useToast } from "@/hooks/useToast"
import { EventDialog } from "@/components/EventDialog"
import { format } from "date-fns"
import { Loading } from "@/components/Loading"

export function Events() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const navigate = useNavigate()
  const { toast } = useToast()

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const response = await getEvents()
      setEvents(response.events)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch events",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Events</h1>
        <Button onClick={() => {
          setSelectedEvent(null)
          setDialogOpen(true)
        }}>
          <Plus className="h-4 w-4 mr-2" />
          Add Event
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <Card
            key={event.id}
            className="group relative overflow-hidden transition-all hover:shadow-lg cursor-pointer"
            onClick={() => navigate(`/events/${event.id}`)}
          >
            <div className="aspect-[16/9] relative">
              <img
                src={event.image}
                alt={event.name}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20" />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{event.name}</h2>
              <p className="text-sm text-muted-foreground mb-4">
                {event.description}
              </p>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{format(new Date(event.date), 'PP')}</span>
                <span>{event.location}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <EventDialog
        event={selectedEvent}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSuccess={fetchEvents}
      />
    </div>
  )
}