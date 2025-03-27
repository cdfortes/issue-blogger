
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { GitHubIssue, fetchIssue } from "@/services/github";
import { 
  ArrowLeft, 
  Calendar, 
  ExternalLink, 
  Loader2, 
  User 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import ReactMarkdown from 'react-markdown';
import CommentSection from "@/components/ui/CommentSection";

const PostDetail: React.FC = () => {
  const { issueNumber } = useParams<{ issueNumber: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<GitHubIssue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      if (!issueNumber) return;
      
      setLoading(true);
      try {
        const issueData = await fetchIssue(undefined, undefined, parseInt(issueNumber));
        setPost(issueData);
        setError(null);
      } catch (err) {
        setError("Failed to load post. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
    
    // Scroll to top when the post loads
    window.scrollTo(0, 0);
  }, [issueNumber]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-40">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="text-center py-40">
        <h2 className="text-2xl font-bold mb-4">Error Loading Post</h2>
        <p className="text-muted-foreground mb-6">{error || "Post not found"}</p>
        <Button onClick={() => navigate('/')}>Return to Home</Button>
      </div>
    );
  }

  const formattedDate = format(new Date(post.created_at), "MMMM d, yyyy");

  return (
    <article className="animate-fade-in">
      {/* Back button */}
      <div className="mb-8">
        <Button 
          variant="ghost" 
          className="group flex items-center gap-2 px-0 hover:bg-transparent"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
          <span>Back</span>
        </Button>
      </div>
      
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight text-balance">
          {post.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>{formattedDate}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <User size={16} />
            <a 
              href={post.user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              {post.user.login}
            </a>
          </div>
          
          <a 
            href={post.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors flex items-center gap-1"
          >
            <span>View on GitHub</span>
            <ExternalLink size={14} />
          </a>
        </div>
        
        {/* Labels */}
        {post.labels && post.labels.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.labels.map(label => (
              <Badge 
                key={label.name}
                variant="secondary"
              >
                {label.name}
              </Badge>
            ))}
          </div>
        )}
      </header>
      
      {/* Content */}
      <div className="prose prose-slate max-w-none mb-12">
        <ReactMarkdown>{post.body}</ReactMarkdown>
      </div>
      
      {/* Comments */}
      <div className="border-t border-border/30 pt-10">
        <h2 className="text-2xl font-semibold mb-6">Comments</h2>
        <CommentSection issueNumber={parseInt(issueNumber)} />
      </div>
    </article>
  );
};

export default PostDetail;
