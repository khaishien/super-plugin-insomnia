import { Octokit } from '@octokit/rest';

interface IGithubService {
  authToken: string;
  owner: string;
  repo: string;
}

interface IGithubServiceRepoContent {
  data: string | null;
}

interface IGithubServiceRepoRequest {
  path: string;
  content: string;
  message: string;
}

class GithubService {
  octokit: Octokit;

  owner: string;

  repo: string;

  constructor({ authToken, owner, repo }: IGithubService) {
    this.octokit = new Octokit({ auth: authToken });
    this.owner = owner;
    this.repo = repo;
  }

  async getRepoContent({
    path,
  }: {
    path: string;
  }): Promise<IGithubServiceRepoContent> {
    try {
      const res = await this.octokit.repos.getContent({
        owner: this.owner,
        repo: this.repo,
        path,
      });

      const { status, data } = res;

      if (status === 200) {
        const { content } = data;
        const fileContent = Buffer.from(content, 'base64').toString('utf8');

        return {
          data: fileContent,
        };
      }

      return {
        data: null,
      };
    } catch (err) {
      return { data: null };
    }
  }

  async createOrUpdateFileContents({
    path,
    content,
    message,
  }: IGithubServiceRepoRequest): Promise<boolean> {
    try {
      const contentBuffer = Buffer.from(content).toString('base64');

      const res = await this.octokit.repos.createOrUpdateFileContents({
        owner: this.owner,
        repo: this.repo,
        path,
        message,
        content: contentBuffer,
      });

      if (res.status === 200) {
        return true;
      }

      return false;
    } catch (err) {
      return false;
    }
  }
}

export default GithubService;
