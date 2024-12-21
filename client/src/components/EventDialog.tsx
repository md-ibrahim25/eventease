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
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { createEvent, updateEvent, type Event } from "@/api/events"
import { useToast } from "@/hooks/useToast"

type EventDialogProps = {
  event?: Event | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

type FormData = {
  name: string
  description: string
  location: string
  date: string
  image: string
}

export function EventDialog({ event, open, onOpenChange, onSuccess }: EventDialogProps) {
  const { toast } = useToast()
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<FormData>({
    defaultValues: event ? {
      name: event.name,
      description: event.description,
      location: event.location,
      date: event.date,
      image: event.image,
    } : undefined
  })

  const onSubmit = async (data: FormData) => {
    try {
      if (event) {
        await updateEvent(event.id, data)
      } else {
        await createEvent({ ...data, attendees: [], tasks: [] })
      }
      toast({
        title: "Success",
        description: `Event ${event ? 'updated' : 'created'} successfully`,
      })
      onSuccess()
      onOpenChange(false)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to ${event ? 'update' : 'create'} event`,
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>{event ? 'Edit Event' : 'Create Event'}</DialogTitle>
            <DialogDescription>
              {event ? 'Make changes to your event here.' : 'Add the details of your new event here.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                {...register("name", { required: true })}
                placeholder="Enter event name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register("description")}
                placeholder="Enter event description"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                {...register("location", { required: true })}
                placeholder="Enter event location"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                {...register("date", { required: true })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                {...register("image", { required: true })}
                placeholder="Enter image URL"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}