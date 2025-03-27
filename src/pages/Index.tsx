
import React, { useState } from "react";
import { Search } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PostList from "@/components/blog/PostList";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/contexts/AppContext";

const Index: React.FC = () => {
  const [owner, setOwner] = useState("facebook");
  const [repo, setRepo] = useState("react");
  const [labels, setLabels] = useState("");
  const [searchParams, setSearchParams] = useState({
    owner: "facebook",
    repo: "react",
    labels: "",
  });
  const { t } = useTranslation();

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
          {/* Search Form */}
          <form 
            onSubmit={handleSearch}
            className="glass max-w-3xl mx-auto p-4 rounded-xl flex flex-col md:flex-row gap-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:flex-1">
              <Input
                placeholder={t("search", "owner")}
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                className="bg-white/50 dark:bg-black/50"
              />
              <Input
                placeholder={t("search", "repo")}
                value={repo}
                onChange={(e) => setRepo(e.target.value)}
                className="bg-white/50 dark:bg-black/50"
              />
            </div>
            <div className="flex gap-2">
              <Input
                placeholder={t("search", "labels")}
                value={labels}
                onChange={(e) => setLabels(e.target.value)}
                className="bg-white/50 dark:bg-black/50 flex-1"
              />
              <Button type="submit" className="min-w-[90px]">
                <Search size={18} className="mr-2" />
                {t("search", "button")}
              </Button>
            </div>
          </form>
        </div>
      </section>
      
      {/* Posts Section */}
      <section className="flex-1 py-8 px-4">
        <div className="container-narrow">
          <h2 className="text-2xl font-bold mb-8">
            {t("posts", "title")} {searchParams.owner}/{searchParams.repo}
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
