import { useState } from "react";
import { ExternalLink, Edit, Check, X, Calendar } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
import { Badge } from "@/components/ui/badge";
import { Link } from "@/components/LinkCard";
import { toast } from "sonner";
import { format } from "date-fns";

const CATEGORIES = [
  "Work",
  "Personal",
  "Learning",
  "Entertainment",
  "Shopping",
  "Social",
  "Other",
];

interface LinkDetailDialogProps {
  link: Link;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: (id: string, updates: Partial<Link>) => void;
}

export const LinkDetailDialog = ({
  link,
  open,
  onOpenChange,
  onUpdate,
}: LinkDetailDialogProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(link.title);
  const [editedUrl, setEditedUrl] = useState(link.url);
  const [editedDescription, setEditedDescription] = useState(link.description || "");
  const [editedCategory, setEditedCategory] = useState(link.category);

  const handleSave = () => {
    if (!editedTitle.trim() || !editedUrl.trim()) {
      toast.error("Title and URL are required");
      return;
    }

    let formattedUrl = editedUrl.trim();
    if (!formattedUrl.startsWith("http://") && !formattedUrl.startsWith("https://")) {
      formattedUrl = "https://" + formattedUrl;
    }

    onUpdate(link.id, {
      title: editedTitle.trim(),
      url: formattedUrl,
      description: editedDescription.trim() || undefined,
      category: editedCategory,
    });

    setIsEditing(false);
    toast.success("Link updated successfully!");
  };

  const handleCancel = () => {
    setEditedTitle(link.title);
    setEditedUrl(link.url);
    setEditedDescription(link.description || "");
    setEditedCategory(link.category);
    setIsEditing(false);
  };

  const getFaviconUrl = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    } catch {
      return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {getFaviconUrl(link.url) && (
                <img
                  src={getFaviconUrl(link.url)!}
                  alt=""
                  className="w-10 h-10 rounded-lg"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              )}
              <div className="flex-1 min-w-0">
                <DialogTitle className="text-2xl truncate">
                  {isEditing ? "Edit Link" : link.title}
                </DialogTitle>
                <DialogDescription className="flex items-center gap-2 mt-1">
                  <Calendar className="w-3 h-3" />
                  Added {format(new Date(link.createdAt), "MMM d, yyyy")}
                </DialogDescription>
              </div>
            </div>
            {!isEditing && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit
              </Button>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {isEditing ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="edit-title">Title *</Label>
                <Input
                  id="edit-title"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  placeholder="Enter link title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-url">URL *</Label>
                <Input
                  id="edit-url"
                  type="url"
                  value={editedUrl}
                  onChange={(e) => setEditedUrl(e.target.value)}
                  placeholder="https://example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  placeholder="Add a note about this link..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-category">Category</Label>
                <Select value={editedCategory} onValueChange={setEditedCategory}>
                  <SelectTrigger id="edit-category">
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
                  variant="outline"
                  onClick={handleCancel}
                  className="flex-1 gap-2"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </Button>
                <Button onClick={handleSave} className="flex-1 gap-2">
                  <Check className="w-4 h-4" />
                  Save Changes
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-4">
                <div>
                  <Label className="text-muted-foreground text-xs uppercase tracking-wide mb-2 block">
                    Category
                  </Label>
                  <Badge variant="secondary" className="text-sm px-3 py-1">
                    {link.category}
                  </Badge>
                </div>

                <div>
                  <Label className="text-muted-foreground text-xs uppercase tracking-wide mb-2 block">
                    URL
                  </Label>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline break-all group"
                  >
                    <ExternalLink className="w-4 h-4 flex-shrink-0 transition-transform group-hover:scale-110" />
                    <span>{link.url}</span>
                  </a>
                </div>

                {link.description && (
                  <div>
                    <Label className="text-muted-foreground text-xs uppercase tracking-wide mb-2 block">
                      Description
                    </Label>
                    <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                      {link.description}
                    </p>
                  </div>
                )}

                {!link.description && (
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    No description added yet. Click edit to add one.
                  </div>
                )}
              </div>

              <div className="pt-4 border-t">
                <Button
                  className="w-full gap-2"
                  onClick={() => window.open(link.url, "_blank")}
                >
                  <ExternalLink className="w-4 h-4" />
                  Open Link
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
