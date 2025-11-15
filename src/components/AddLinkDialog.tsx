import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const CATEGORIES = [
  "Work",
  "Personal",
  "Learning",
  "Entertainment",
  "Shopping",
  "Social",
  "Other",
];

interface AddLinkDialogProps {
  onAdd: (link: {
    title: string;
    url: string;
    description?: string;
    category: string;
  }) => void;
}

export const AddLinkDialog = ({ onAdd }: AddLinkDialogProps) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Other");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !url.trim()) {
      toast.error("Please fill in title and URL");
      return;
    }

    let formattedUrl = url.trim();
    if (!formattedUrl.startsWith("http://") && !formattedUrl.startsWith("https://")) {
      formattedUrl = "https://" + formattedUrl;
    }

    onAdd({
      title: title.trim(),
      url: formattedUrl,
      description: description.trim() || undefined,
      category,
    });

    setTitle("");
    setUrl("");
    setDescription("");
    setCategory("Other");
    setOpen(false);
    toast.success("Link added successfully!");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="gap-2 shadow-lg">
          <Plus className="w-5 h-5" />
          Add Link
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Link</DialogTitle>
          <DialogDescription>
            Save a link you want to keep for later or frequently access.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="e.g., React Documentation"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="url">URL *</Label>
            <Input
              id="url"
              type="url"
              placeholder="e.g., https://react.dev"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              placeholder="Add a note about this link..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Add Link
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
