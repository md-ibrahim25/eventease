import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getEvents, type Event } from "@/api/events";
import { updateTask } from "@/api/tasks";
import { useToast } from "@/hooks/useToast";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Plus } from "lucide-react";
import { TaskDialog } from "@/components/TaskDialog";

export function Tasks() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchEvents = async () => {
    try {
      const response = await getEvents();
      setEvents(response.events);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch tasks",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleStatusToggle = async (eventId: string, taskId: string, currentStatus: 'pending' | 'completed') => {
    try {
      await updateTask(eventId, taskId, {
        status: currentStatus === 'pending' ? 'completed' : 'pending'
      });
      await fetchEvents();
      toast({
        title: "Success",
        description: "Task status updated successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update task status",
      });
    }
  };

  const allTasks = events.flatMap(event =>
    event.tasks.map(task => ({
      ...task,
      eventId: event.id,
      eventName: event.name
    }))
  );

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead>Task</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allTasks.map((task) => (
                <TableRow key={task.id} className="hover:bg-muted/50">
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleStatusToggle(task.eventId, task.id, task.status)}
                    >
                      {task.status === 'completed' ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <Circle className="h-4 w-4 text-yellow-500" />
                      )}
                    </Button>
                  </TableCell>
                  <TableCell className="font-medium">{task.name}</TableCell>
                  <TableCell>{task.eventName}</TableCell>
                  <TableCell>{task.assignedTo}</TableCell>
                  <TableCell>{format(new Date(task.deadline), 'PP')}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
      {dialogOpen && (
        <TaskDialog
          eventId={selectedEventId || events[0]?.id}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onSuccess={fetchEvents}
        />
      )}
    </div>
  );
}