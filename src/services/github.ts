
import { toast } from "sonner";

// Types for GitHub API responses
export interface GitHubIssue {
  id: number;
  number: number;
  title: string;
  body: string;
  created_at: string;
  updated_at: string;
  html_url: string;
  user: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  labels: {
    name: string;
    color: string;
  }[];
  comments: number;
}

export interface GitHubComment {
  id: number;
  body: string;
  created_at: string;
  updated_at: string;
  user: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
}

// Default repository information
const DEFAULT_OWNER = "facebook";
const DEFAULT_REPO = "react";

// Function to fetch issues from a GitHub repository
export const fetchIssues = async (
  owner: string = DEFAULT_OWNER,
  repo: string = DEFAULT_REPO,
  page: number = 1, 
  perPage: number = 10,
  state: string = "open",
  labels?: string
): Promise<GitHubIssue[]> => {
  try {
    const labelsQuery = labels ? `&labels=${encodeURIComponent(labels)}` : "";
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/issues?state=${state}&page=${page}&per_page=${perPage}${labelsQuery}&sort=created&direction=desc`
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();
    return data as GitHubIssue[];
  } catch (error) {
    console.error("Error fetching issues:", error);
    toast.error("Failed to load issues. Please try again later.");
    return [];
  }
};

// Function to fetch a single issue
export const fetchIssue = async (
  owner: string = DEFAULT_OWNER,
  repo: string = DEFAULT_REPO,
  issueNumber: number
): Promise<GitHubIssue | null> => {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}`
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();
    return data as GitHubIssue;
  } catch (error) {
    console.error("Error fetching issue:", error);
    toast.error("Failed to load issue. Please try again later.");
    return null;
  }
};

// Function to fetch comments for an issue
export const fetchComments = async (
  owner: string = DEFAULT_OWNER,
  repo: string = DEFAULT_REPO,
  issueNumber: number
): Promise<GitHubComment[]> => {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}/comments`
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();
    return data as GitHubComment[];
  } catch (error) {
    console.error("Error fetching comments:", error);
    toast.error("Failed to load comments. Please try again later.");
    return [];
  }
};
