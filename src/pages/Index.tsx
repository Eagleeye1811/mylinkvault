import { useState, useEffect } from "react";
import { Search, Link as LinkIcon, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { LinkCard, Link } from "@/components/LinkCard";
import { AddLinkDialog } from "@/components/AddLinkDialog";
import { LinkDetailDialog } from "@/components/LinkDetailDialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import logoImage from "@/assets/logo.png";

const STORAGE_KEY = "saved-links";

const Index = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLink, setSelectedLink] = useState<Link | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  useEffect(() => {
    const savedLinks = localStorage.getItem(STORAGE_KEY);
    if (savedLinks) {
      setLinks(JSON.parse(savedLinks));
    }
  }, []);

  const saveLinks = (newLinks: Link[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newLinks));
    setLinks(newLinks);
  };

  const handleAddLink = (linkData: {
    title: string;
    url: string;
    description?: string;
    category: string;
  }) => {
    const newLink: Link = {
      id: Date.now().toString(),
      ...linkData,
      createdAt: new Date().toISOString(),
    };
    saveLinks([newLink, ...links]);
  };

  const handleDeleteLink = (id: string) => {
    saveLinks(links.filter((link) => link.id !== id));
    setIsDetailDialogOpen(false);
    toast.success("Link deleted");
  };

  const handleUpdateLink = (id: string, updates: Partial<Link>) => {
    const updatedLinks = links.map((link) =>
      link.id === id ? { ...link, ...updates } : link
    );
    saveLinks(updatedLinks);
  };

  const handleLinkClick = (link: Link) => {
    setSelectedLink(link);
    setIsDetailDialogOpen(true);
  };

  const categories = Array.from(new Set(links.map((link) => link.category)));

  const filteredLinks = links.filter((link) => {
    const matchesSearch =
      link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || link.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="mb-12 text-center animate-slide-up">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-3xl blur-xl opacity-50 animate-glow"></div>
              <img 
                src={logoImage} 
                alt="LinkVault Logo" 
                className="w-16 h-16 relative z-10 drop-shadow-2xl animate-float"
              />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
              LinkVault
            </h1>
          </div>
          <p className="text-muted-foreground text-lg flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-accent animate-pulse" />
            Your personal collection of important links, beautifully organized
            <Sparkles className="w-4 h-4 text-accent animate-pulse" />
          </p>
        </header>

        <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="relative flex-1 group">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 transition-all duration-300 group-focus-within:text-primary group-focus-within:scale-110" />
            <Input
              placeholder="Search links..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 transition-all duration-300 focus:shadow-lg focus:border-primary/50"
            />
          </div>
          <AddLinkDialog onAdd={handleAddLink} />
        </div>

        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Badge
              variant={selectedCategory === null ? "default" : "secondary"}
              className="cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-md"
              onClick={() => setSelectedCategory(null)}
            >
              All ({links.length})
            </Badge>
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "secondary"}
                className="cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-md"
                onClick={() =>
                  setSelectedCategory(selectedCategory === category ? null : category)
                }
              >
                {category} ({links.filter((l) => l.category === category).length})
              </Badge>
            ))}
          </div>
        )}

        {filteredLinks.length === 0 ? (
          <div className="text-center py-16 animate-scale-in">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 mx-auto mb-6 flex items-center justify-center animate-float">
              <LinkIcon className="w-12 h-12 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-foreground">
              {searchQuery || selectedCategory
                ? "No links found"
                : "No links saved yet"}
            </h3>
            <p className="text-muted-foreground mb-6 text-lg">
              {searchQuery || selectedCategory
                ? "Try adjusting your filters"
                : "Start adding your important links to keep them organized"}
            </p>
            {!searchQuery && !selectedCategory && (
              <div className="inline-block animate-pulse">
                <div className="w-12 h-1 bg-gradient-to-r from-primary to-accent rounded-full"></div>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredLinks.map((link, index) => (
              <div 
                key={link.id} 
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <LinkCard 
                  link={link} 
                  onDelete={handleDeleteLink}
                  onClick={() => handleLinkClick(link)}
                />
              </div>
            ))}
          </div>
        )}

        {selectedLink && (
          <LinkDetailDialog
            link={selectedLink}
            open={isDetailDialogOpen}
            onOpenChange={setIsDetailDialogOpen}
            onUpdate={handleUpdateLink}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
