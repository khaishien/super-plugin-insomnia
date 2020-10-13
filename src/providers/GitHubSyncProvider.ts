import SyncProvider from './SyncProvider';
import { IInsomniaContext, IInsomniaExport } from '../@types/insomnia';
import GithubService from '../services/github';
import Store from '../store';

class GitHubSyncProvider extends SyncProvider {
  private githubService?: GithubService;

  constructor(insomniaContext: IInsomniaContext) {
    super(insomniaContext);
  }

  async initGitHub(): Promise<void> {
    const store = new Store(this.insomniaContext);
    const apiToken = await store.getAPIToken();
    const repoOwner = await store.getRepoOwner();
    const repoName = await store.getRepoName();

    console.log(`initGitHub=>apiToken=>${apiToken}`);
    console.log(`initGitHub=>repoOwner=>${repoOwner}`);
    console.log(`initGitHub=>repoName=>${repoName}`);

    this.githubService = new GithubService({
      authToken: apiToken,
      owner: repoOwner,
      repo: repoName,
    });
  }

  async forcePull(): Promise<void> {
    await this.initGitHub();
    const githubData = await this.githubService?.getRepoContent({
      path: 'data.json',
    });
    if (githubData) {
      await this.importToInsomnia(githubData);
    }
  }

  async pull(): Promise<void> {
    await this.initGitHub();
    const localData = await this.exportFromInsomnia();
    const githubData = await this.githubService?.getRepoContent({
      path: 'data.json',
    });

    const finalResources: IInsomniaExport[] = [];

    if (localData?.data?.resources && githubData?.data?.resources) {
      const arr = [...localData.data.resources, ...githubData.data.resources];

      const countList = arr.reduce((p, c) => {
        // eslint-disable-next-line no-param-reassign
        p[c._id] = (p[c._id] || 0) + 1;
        return p;
      }, {});

      Object.keys(countList).forEach(key => {
        const count = countList[key];

        if (count > 1) {
          const result = arr.filter(obj => {
            return obj._id === key;
          });

          result.sort((a, b) => {
            return b.modified - a.modified;
          });
          finalResources.push(result[0]);
        } else {
          finalResources.push(arr.find(item => item._id === key));
        }
      });

      await this.importToInsomnia({
        data: { ...localData.data, resources: finalResources },
      });
    }

    // await this.importToInsomnia(content);
  }

  async push(): Promise<void> {
    await this.initGitHub();
    const res = await this.exportFromInsomnia();

    await this.githubService?.createOrUpdateFileContents({
      path: 'data.json',
      content: res,
      message: '---',
    });
  }
}

export default GitHubSyncProvider;
