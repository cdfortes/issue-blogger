
import React, { useState, useEffect } from "react";
import { GitHubComment, fetchComments } from "@/services/github";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import ReactMarkdown from 'react-markdown';

interface CommentSectionProps {
  issueNumber: number;
}

const CommentSection: React.FC<CommentSectionProps> = ({ issueNumber }) => {
  const [comments, setComments] = useState<GitHubComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadComments = async () => {
      setLoading(true);
      try {
        const commentsData = await fetchComments(undefined, undefined, issueNumber);
        setComments(commentsData);
        setError(null);
      } catch (err) {
        setError("Failed to load comments. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadComments();
  }, [issueNumber]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <MessageSquare size={40} className="text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-1">No Comments Yet</h3>
        <p className="text-muted-foreground">
          Be the first to comment on this issue on GitHub.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {comments.map((comment, index) => (
        <Card 
          key={comment.id}
          className="animate-slide-up opacity-0"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <CardHeader className="p-4 pb-2 flex flex-row items-start space-y-0 gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={comment.user.avatar_url} alt={comment.user.login} />
              <AvatarFallback>{comment.user.login.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <a 
                  href={comment.user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium hover:text-primary transition-colors"
                >
                  {comment.user.login}
                </a>
                <span className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <div className="prose prose-sm prose-slate max-w-none">
              <ReactMarkdown>{comment.body}</ReactMarkdown>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CommentSection;
