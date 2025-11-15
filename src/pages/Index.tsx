import { useState, useEffect } from "react";
import { Search, Link as LinkIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { LinkCard, Link } from "@/components/LinkCard";
import { AddLinkDialog } from "@/components/AddLinkDialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const STORAGE_KEY = "saved-links";

const Index = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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
    toast.success("Link deleted");
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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <LinkIcon className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">LinkVault</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Your personal collection of important links, all in one place
          </p>
        </header>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search links..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <AddLinkDialog onAdd={handleAddLink} />
        </div>

        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            <Badge
              variant={selectedCategory === null ? "default" : "secondary"}
              className="cursor-pointer"
              onClick={() => setSelectedCategory(null)}
            >
              All ({links.length})
            </Badge>
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "secondary"}
                className="cursor-pointer"
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
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
              <LinkIcon className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">
              {searchQuery || selectedCategory
                ? "No links found"
                : "No links saved yet"}
            </h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery || selectedCategory
                ? "Try adjusting your filters"
                : "Start adding your important links to keep them organized"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredLinks.map((link) => (
              <LinkCard key={link.id} link={link} onDelete={handleDeleteLink} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
