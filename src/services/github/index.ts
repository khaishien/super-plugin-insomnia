import { Octokit } from '@octokit/rest';

export interface IGithubService {
  authToken: string;
  owner: string;
  repo: string;
}

interface IGithubServiceRepoRequest {
  path: string;
  content: IDataContent;
  message: string;
}

class GithubService {
  private octokit: Octokit;

  private owner: string;

  private repo: string;

  constructor({ authToken, owner, repo }: IGithubService) {
    this.octokit = new Octokit({ auth: authToken });
    this.owner = owner;
    this.repo = repo;
  }

  public async getRepoContent({
    path,
  }: {
    path: string;
  }): Promise<IDataContent> {
    try {
      const res = await this.octokit.repos.getContent({
        owner: this.owner,
        repo: this.repo,
        path,
      });
      console.log('getRepoContent res=>', res);
      const { status, data } = res;

      if (status === 200) {
        const { content, sha } = data;
        const fileContent = Buffer.from(content, 'base64').toString('utf8');

        return {
          data: JSON.parse(fileContent),
          sha,
        };
      }

      return {
        data: null,
      };
    } catch (err) {
      console.log('getRepoContent err=>', err);
      return { data: null, sha: undefined };
    }
  }

  public async createOrUpdateFileContents({
    path,
    content,
    message,
  }: IGithubServiceRepoRequest): Promise<boolean> {
    try {
      console.log('createOrUpdateFileContents => content', content);
      let { data } = content;
      if (typeof data === 'object') {
        data = JSON.stringify(data);
      }
      console.log('createOrUpdateFileContents => data', data);
      const contentBuffer = Buffer.from(data).toString('base64');

      const { sha } = await this.getRepoContent({ path });

      const res = await this.octokit.repos.createOrUpdateFileContents({
        owner: this.owner,
        repo: this.repo,
        path,
        message,
        content: contentBuffer,
        sha,
      });

      if (res.status === 200) {
        return true;
      }

      return false;
    } catch (err) {
      console.log('createOrUpdateFileContents => err', err);
      return false;
    }
  }
}

export default GithubService;
