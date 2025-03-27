
import React, { useState } from "react";
import { Search } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PostList from "@/components/blog/PostList";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

const Index: React.FC = () => {
  const [owner, setOwner] = useState("facebook");
  const [repo, setRepo] = useState("react");
  const [searchInput, setSearchInput] = useState("");
  const [labels, setLabels] = useState("");
  const [searchParams, setSearchParams] = useState({
    owner: "facebook",
    repo: "react",
    labels: "",
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({
      owner,
      repo,
      labels,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-4">
        <div className="container-narrow">
          <div className="text-center animate-slide-down opacity-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-balance">
              Discover GitHub Issues <br className="hidden md:block" />
              As Beautiful Blog Posts
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
              Issue Blogger transforms GitHub issues into an elegant, 
              readable format designed for developers and tech enthusiasts.
            </p>
            
            {/* Search Form */}
            <form 
              onSubmit={handleSearch}
              className="glass max-w-3xl mx-auto p-4 rounded-xl flex flex-col md:flex-row gap-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:flex-1">
                <Input
                  placeholder="Owner (e.g. facebook)"
                  value={owner}
                  onChange={(e) => setOwner(e.target.value)}
                  className="bg-white/50"
                />
                <Input
                  placeholder="Repository (e.g. react)"
                  value={repo}
                  onChange={(e) => setRepo(e.target.value)}
                  className="bg-white/50"
                />
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Labels (comma separated)"
                  value={labels}
                  onChange={(e) => setLabels(e.target.value)}
                  className="bg-white/50 flex-1"
                />
                <Button type="submit" className="min-w-[90px]">
                  <Search size={18} className="mr-2" />
                  Search
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
      
      {/* Posts Section */}
      <section className="flex-1 py-8 px-4">
        <div className="container-narrow">
          <h2 className="text-2xl font-bold mb-8">
            Latest Posts from {searchParams.owner}/{searchParams.repo}
          </h2>
          
          <PostList 
            owner={searchParams.owner} 
            repo={searchParams.repo} 
            labels={searchParams.labels}
          />
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
