import { ExternalLink, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface Link {
  id: string;
  title: string;
  url: string;
  description?: string;
  category: string;
  createdAt: string;
}

interface LinkCardProps {
  link: Link;
  onDelete: (id: string) => void;
}

export const LinkCard = ({ link, onDelete }: LinkCardProps) => {
  const getFaviconUrl = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
    } catch {
      return null;
    }
  };

  return (
    <Card className="group p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-border bg-card animate-fade-in hover:border-primary/20 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary/5 before:to-accent/5 before:opacity-0 hover:before:opacity-100 before:transition-opacity">
      <div className="flex items-start justify-between gap-3 relative z-10">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            {getFaviconUrl(link.url) && (
              <img
                src={getFaviconUrl(link.url)!}
                alt=""
                className="w-5 h-5 rounded"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            )}
            <h3 className="font-semibold text-foreground truncate">{link.title}</h3>
          </div>
          {link.description && (
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {link.description}
            </p>
          )}
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {link.category}
            </Badge>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary hover:underline truncate flex items-center gap-1 max-w-[200px] transition-all duration-200 hover:gap-2"
            >
              <ExternalLink className="w-3 h-3 flex-shrink-0 transition-transform group-hover:scale-110" />
              <span className="truncate">{link.url}</span>
            </a>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(link.id)}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
};
