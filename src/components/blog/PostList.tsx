
import React, { useState, useEffect } from "react";
import PostCard from "./PostCard";
import { Button } from "@/components/ui/button";
import { GitHubIssue, fetchIssues } from "@/services/github";
import { Loader2 } from "lucide-react";
import { useTranslation } from "@/contexts/AppContext";

interface PostListProps {
  owner?: string;
  repo?: string;
  labels?: string;
}

const PostList: React.FC<PostListProps> = ({ owner, repo, labels }) => {
  const [posts, setPosts] = useState<GitHubIssue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { t } = useTranslation();

  const loadPosts = async (pageNumber: number = 1) => {
    if (pageNumber === 1) {
      setLoading(true);
    }
    
    try {
      const newPosts = await fetchIssues(owner, repo, pageNumber, 10, "open", labels);
      
      if (pageNumber === 1) {
        setPosts(newPosts);
      } else {
        setPosts(prevPosts => [...prevPosts, ...newPosts]);
      }
      
      // If we got fewer posts than requested, there are no more pages
      setHasMore(newPosts.length === 10);
      setError(null);
    } catch (err) {
      setError(t("posts", "error"));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts(1);
  }, [owner, repo, labels]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadPosts(nextPage);
  };

  if (loading && posts.length === 0) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error && posts.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-destructive mb-4">{error}</p>
        <Button 
          onClick={() => loadPosts(1)} 
          variant="outline"
        >
          {t("posts", "tryAgain")}
        </Button>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground mb-2">{t("posts", "noResults")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map(post => (
          <div key={post.id} className="animate-slide-up opacity-0" style={{ 
            animationDelay: `${posts.indexOf(post) * 0.1}s` 
          }}>
            <PostCard post={post} />
          </div>
        ))}
      </div>
      
      {hasMore && (
        <div className="flex justify-center">
          <Button 
            onClick={handleLoadMore} 
            variant="outline"
            disabled={loading}
            className="min-w-[150px]"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                {t("posts", "loading")}
              </>
            ) : (
              t("posts", "loadMore")
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default PostList;
