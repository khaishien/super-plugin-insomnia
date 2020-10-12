import SyncProvider from './SyncProvider';
import { IInsomniaExport } from '../@types/insomnia';
import { doProcess } from '../processor';

class GitHubSyncProvider extends SyncProvider {
  async receive(): Promise<void> {}

  async send(): Promise<void> {
    const res = await this.exportFromInsomnia();
    const response: IInsomniaExport = JSON.parse(res);
    console.log('res', response);

    const workspaceItems = doProcess(response);
    console.log('## workspaces', workspaceItems);
  }
}

export default GitHubSyncProvider;
