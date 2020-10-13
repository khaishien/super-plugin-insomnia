import * as React from 'react';
import ReactDOM from 'react-dom';
import { IInsomniaWorkspaceAction } from './@types/insomnia';

import { Settings } from './components';
import GitHubSyncProvider from './providers/GitHubSyncProvider';
// import { updateDictionary, updateWorkspace } from './sync.js';

const workspaceActions: IInsomniaWorkspaceAction[] = [
  {
    label: `Pull from Github`,
    icon: 'fa-download',
    action: async (context, models) => {
      console.log('## context', context);
      console.log('## models', models);

      const provider = new GitHubSyncProvider(context);
      await provider.pull();
    },
  },
  {
    label: `FORCE Pull from Github`,
    icon: 'fa-download',
    action: async (context, models) => {
      console.log('## context', context);
      console.log('## models', models);

      const provider = new GitHubSyncProvider(context);
      await provider.forcePull();
    },
  },
  {
    label: `Push from Github`,
    icon: 'fa-upload',
    action: async (context, models) => {
      console.log('## context', context);
      console.log('## models', models);

      const provider = new GitHubSyncProvider(context);
      await provider.push();
    },
  },
  {
    label: 'MI - Settings',
    icon: 'fa-cogs',
    action: (context, _): void => {
      const root = document.createElement('div');
      ReactDOM.render(
        React.createElement(Settings, { insomniaContext: context }),
        root,
      );
      context.app.dialog('MI - Settings', root);
    },
  },
];

export { workspaceActions };
