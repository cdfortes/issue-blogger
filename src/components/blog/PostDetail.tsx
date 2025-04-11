
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { GitHubIssue, fetchIssue } from "@/services/github";
import { 
  ArrowLeft, 
  Calendar, 
  ExternalLink, 
  Loader2, 
  User,
  Globe,
  Volume2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import CommentSection from "@/components/ui/CommentSection";
import BlogAccessibilityControls from "./BlogAccessibilityControls";

// Mock translation function since we can't actually use Google Translate API without credentials
const translateText = async (text: string, targetLanguage: string) => {
  // In a real implementation, you would call the Google Translate API
  // This is just a mock implementation to demonstrate the UI functionality
  
  // Return the original text if the target language is English
  if (targetLanguage === 'en') return text;
  
  // For demo purposes, we'll just add a prefix to the text
  const languagePrefixes: {[key: string]: string} = {
    'pt': '[Traduzido para Português] ',
    'es': '[Traducido al Español] ',
    'fr': '[Traduit en Français] ',
    'de': '[Auf Deutsch übersetzt] '
  };
  
  return languagePrefixes[targetLanguage] + text;
};

const PostDetail: React.FC = () => {
  const { issueNumber } = useParams<{ issueNumber: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<GitHubIssue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [translatedContent, setTranslatedContent] = useState<string | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState<string>('en');
  
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

  const handleTranslate = async (language: string) => {
    if (!post) return;
    
    setCurrentLanguage(language);
    
    if (language === 'en') {
      setTranslatedContent(null); // Use original content
      return;
    }
    
    try {
      const translated = await translateText(post.body, language);
      setTranslatedContent(translated);
    } catch (err) {
      console.error('Translation error:', err);
      // Could show a toast notification here about the translation failure
    }
  };

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
  const displayContent = translatedContent || post.body;

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
      
      {/* Accessibility Controls */}
      <BlogAccessibilityControls 
        content={displayContent}
        onTranslate={handleTranslate}
        currentLanguage={currentLanguage}
      />
      
      {/* Content with enhanced code blocks */}
      <div className="prose prose-slate dark:prose-invert max-w-none mb-12">
        <ReactMarkdown
          components={{
            code({className, children, ...props}) {
              const match = /language-(\w+)/.exec(className || '');
              return !className?.includes('language-') ? (
                <code className="bg-slate-200 dark:bg-slate-800 rounded px-1.5 py-0.5 text-sm font-mono" {...props}>
                  {children}
                </code>
              ) : (
                <div className="rounded-md overflow-hidden my-4">
                  <div className="bg-gray-800 text-gray-200 px-4 py-2 text-xs font-mono flex justify-between items-center border-b border-gray-700">
                    <span>{match ? match[1] : 'code'}</span>
                    <span className="opacity-50">code</span>
                  </div>
                  <SyntaxHighlighter
                    language={match ? match[1] : ''}
                    style={vscDarkPlus}
                    customStyle={{
                      margin: 0,
                      padding: '1rem',
                      borderRadius: '0 0 0.375rem 0.375rem',
                    }}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                </div>
              );
            },
            // Enhance blockquote styling
            blockquote({children}) {
              return (
                <blockquote className="border-l-4 border-primary/30 pl-4 italic text-gray-700 dark:text-gray-300">
                  {children}
                </blockquote>
              );
            },
            // Enhance table styling
            table({children}) {
              return (
                <div className="overflow-x-auto">
                  <table className="border-collapse w-full">{children}</table>
                </div>
              );
            }
          }}
        >
          {displayContent}
        </ReactMarkdown>
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
