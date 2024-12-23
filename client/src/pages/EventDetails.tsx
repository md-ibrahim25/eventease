import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Calendar, MapPin, Trash2, Edit } from "lucide-react";
import { format } from "date-fns";
import { getEvent, deleteEvent, type Event } from "@/api/events";
import { useToast } from "@/hooks/useToast";
import { EventDialog } from "@/components/EventDialog";
import { AttendeesList } from "@/components/AttendeesList";
import { TasksList } from "@/components/TasksList";
import { Loading } from "@/components/Loading";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function EventDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const fetchEvent = async () => {
    if (!id) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Event ID is required",
      });
      navigate("/events");
      return;
    }

    try {
      setLoading(true);
      const response = await getEvent(id);
      setEvent(response.event);
    } catch (error: any) {
      console.error("Error fetching event details:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to fetch event details",
      });
      navigate("/events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const handleDelete = async () => {
    if (!id) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Event ID is required",
      });
      return;
    }

    try {
      await deleteEvent(id);
      toast({
        title: "Success",
        description: "Event deleted successfully",
      });
      navigate("/events");
    } catch (error: any) {
      console.error("Error deleting event:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to delete event",
      });
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate("/events")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Events
          </Button>
        </div>
        <Loading />
      </div>
    );
  }

  if (!event) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate("/events")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Events
        </Button>
        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setDialogOpen(true)}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="destructive"
            onClick={() => setDeleteDialogOpen(true)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <Card className="p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight">{event.name}</h1>
            <p className="text-muted-foreground">{event.description}</p>
            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-4 w-4 mr-2" />
              {event.location}
            </div>
            <div className="flex items-center text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2" />
              {format(new Date(event.date), 'PPP')}
            </div>
          </div>
          <div className="aspect-[16/9] relative rounded-lg overflow-hidden">
            {event.image ? (
              <img
                src={event.image}
                alt={event.name}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">No image available</span>
              </div>
            )}
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <Tabs defaultValue="attendees">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="attendees">Attendees</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
          </TabsList>
          <TabsContent value="attendees" className="mt-6">
            <AttendeesList eventId={id} attendees={event.attendees} onUpdate={fetchEvent} />
          </TabsContent>
          <TabsContent value="tasks" className="mt-6">
            <TasksList eventId={id} tasks={event.tasks} onUpdate={fetchEvent} attendees={event.attendees} />
          </TabsContent>
        </Tabs>
      </Card>

      <EventDialog
        event={event}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSuccess={fetchEvent}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the event
              and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}