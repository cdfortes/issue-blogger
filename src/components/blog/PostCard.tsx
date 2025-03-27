
import React from "react";
import { Link } from "react-router-dom";
import { CalendarIcon, MessageSquare, User } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GitHubIssue } from "@/services/github";
import { formatDistanceToNow } from "date-fns";

interface PostCardProps {
  post: GitHubIssue;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const formattedDate = formatDistanceToNow(new Date(post.created_at), { addSuffix: true });
  
  // Extract a preview from the post body
  const bodyPreview = post.body
    ? post.body.slice(0, 150) + (post.body.length > 150 ? "..." : "")
    : "No content available";
  
  return (
    <Link to={`/post/${post.number}`}>
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <div className="flex items-center gap-1">
              <CalendarIcon size={14} />
              <span>{formattedDate}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <User size={14} />
              <span>{post.user.login}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <MessageSquare size={14} />
              <span>{post.comments}</span>
            </div>
          </div>
          <h3 className="text-xl font-semibold leading-tight hover:text-primary transition-colors">
            {post.title}
          </h3>
        </CardHeader>
        
        <CardContent>
          <p className="text-muted-foreground line-clamp-3">{bodyPreview}</p>
        </CardContent>
        
        <CardFooter className="flex flex-wrap gap-2">
          {post.labels && post.labels.length > 0 && 
            post.labels.slice(0, 3).map((label) => (
              <Badge 
                key={label.name} 
                variant="secondary"
                className="text-xs"
              >
                {label.name}
              </Badge>
            ))
          }
          {post.labels && post.labels.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{post.labels.length - 3} more
            </Badge>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
};

export default PostCard;
