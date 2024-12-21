import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useForm, Controller } from "react-hook-form"
import { createTask, updateTask, type Task } from "@/api/tasks"
import { useToast } from "@/hooks/useToast"
import { useState, useEffect } from "react"
import { getAttendees, type Attendee } from "@/api/attendees"
import { Loading } from "@/components/Loading"

type TaskDialogProps = {
  eventId: string
  task?: Task | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

type FormData = {
  name: string
  deadline: string
  assignedTo: string
}

export function TaskDialog({ eventId, task, open, onOpenChange, onSuccess }: TaskDialogProps) {
  const { toast } = useToast()
  const [attendees, setAttendees] = useState<Attendee[]>([])
  const [loading, setLoading] = useState(true)
  const { register, handleSubmit, control, formState: { isSubmitting } } = useForm<FormData>({
    defaultValues: task ? {
      name: task.name,
      deadline: task.deadline,
      assignedTo: task.assignedTo,
    } : undefined
  })

  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        setLoading(true)
        const response = await getAttendees()
        setAttendees(response.attendees)
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch attendees",
        })
      } finally {
        setLoading(false)
      }
    }

    if (open) {
      fetchAttendees()
    }
  }, [open, toast])

  const onSubmit = async (data: FormData) => {
    try {
      if (task) {
        await updateTask(eventId, task.id, {
          ...data,
          status: task.status
        })
      } else {
        await createTask(eventId, {
          ...data,
          status: 'pending'
        })
      }
      toast({
        title: "Success",
        description: `Task ${task ? 'updated' : 'added'} successfully`,
      })
      onSuccess()
      onOpenChange(false)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to ${task ? 'update' : 'add'} task`,
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-background">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>{task ? 'Edit Task' : 'Add Task'}</DialogTitle>
            <DialogDescription>
              {task ? 'Edit the task details.' : 'Add a new task to this event.'}
            </DialogDescription>
          </DialogHeader>
          {loading ? (
            <Loading />
          ) : (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Task Name</Label>
                <Input
                  id="name"
                  {...register("name", { required: true })}
                  placeholder="Enter task name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="deadline">Deadline</Label>
                <Input
                  id="deadline"
                  type="date"
                  {...register("deadline", { required: true })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="assignedTo">Assigned To</Label>
                <Controller
                  name="assignedTo"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an attendee" />
                      </SelectTrigger>
                      <SelectContent>
                        {attendees.map((attendee) => (
                          <SelectItem key={attendee.id} value={attendee.name}>
                            {attendee.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting || loading}>
              {isSubmitting ? "Saving..." : (task ? "Save Changes" : "Add Task")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}