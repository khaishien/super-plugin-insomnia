import fs from 'fs';
import * as React from 'react';
import ReactDOM from 'react-dom';

import { Settings } from './components';
import Store from './store';
import GithubService from './services/github';
// import { updateDictionary, updateWorkspace } from './sync.js';

const workspaceActions: IInsomniaWorkspaceAction[] = [
  {
    label: 'Sync with Github',
    icon: 'fa-star',
    action: async (context, models) => {
      console.log('## context', context);
      console.log('## models', models);

      const store = new Store(context);
      const apiToken = await store.getAPIToken();
      const repoOwner = await store.getRepoOwner();
      const repoName = await store.getRepoName();

      console.log('apiToken', apiToken);
      console.log('repoOwner', repoOwner);
      console.log('repoName', repoName);

      const githubService = new GithubService({
        authToken: apiToken,
        owner: repoOwner,
        repo: repoName,
      });
      githubService.getRepoContent({ path: 'dictionary.json' });

      const ex = await context.data.export.insomnia({
        includePrivate: false,
        format: 'json',
        // workspace: models.workspace,
      });

      console.log('##ex', JSON.parse(ex));

      const data = JSON.parse(ex);
      const types = data.resources.map(el => el._type);
      console.log('types', types);

      // const workspaceObj = JSON.parse(ex);
      // const workspaceData = workspaceObj.resources.find(
      //   el => el._type === 'workspace',
      // );
      // const {
      //   _id: workspaceId,
      //   name: workspaceName,
      //   modified: modifiedAt,
      // } = workspaceData;

      // await updateWorkspace(
      //   {
      //     workspaceId,
      //   },
      //   ex,
      // );

      // await updateDictionary({
      //   workspaceId,
      //   workspaceName,
      //   modifiedAt,
      // });

      //   fs.writeFileSync('/users/barry/Desktop/export.json', ex);
    },
  },
  {
    label: 'Import',
    icon: 'fa-star',
    action: async (context, models) => {
      console.log('##asfad');

      const content = fs.readFileSync(
        '/users/barry/Desktop/export.json',
        'utf8',
      );
      await context.data.import.raw(content);
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
