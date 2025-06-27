import { useQuery } from "@tanstack/react-query";
import { GitHubUser, GitHubRepo } from "../types/github";

const GITHUB_API_URL = "https://api.github.com";
const USERNAME = "sw3do";

const fetchGitHubUser = async (): Promise<GitHubUser> => {
  const response = await fetch(`${GITHUB_API_URL}/users/${USERNAME}`);
  if (!response.ok) {
    throw new Error(`GitHub user fetch failed: ${response.statusText}`);
  }
  return response.json();
};

const fetchGitHubRepos = async (): Promise<GitHubRepo[]> => {
  const response = await fetch(
    `${GITHUB_API_URL}/users/${USERNAME}/repos?sort=updated&per_page=100`
  );
  if (!response.ok) {
    throw new Error(`GitHub repos fetch failed: ${response.statusText}`);
  }
  const repos = await response.json();
  return repos.filter((repo: GitHubRepo) => !repo.fork);
};

export const useGitHubUser = () => {
  return useQuery({
    queryKey: ["github-user", USERNAME],
    queryFn: fetchGitHubUser,
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });
};

export const useGitHubRepos = () => {
  return useQuery({
    queryKey: ["github-repos", USERNAME],
    queryFn: fetchGitHubRepos,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

export const useGitHubData = () => {
  const userQuery = useGitHubUser();
  const reposQuery = useGitHubRepos();

  return {
    user: userQuery.data,
    repos: reposQuery.data || [],
    isLoading: userQuery.isLoading || reposQuery.isLoading,
    isError: userQuery.isError || reposQuery.isError,
    error: userQuery.error || reposQuery.error,
    refetchUser: userQuery.refetch,
    refetchRepos: reposQuery.refetch,
    refetchAll: () => {
      userQuery.refetch();
      reposQuery.refetch();
    },
  };
}; 