import fs from 'fs';
// import { updateDictionary, updateWorkspace } from './sync.js';

const workspaceActions: IInsomniaWorkspaceAction[] = [
  {
    label: 'Sync with Github',
    icon: 'fa-star',
    action: async (context, models) => {
      console.log('Helo!');
      //   console.log('## context', context);
      //   console.log('##content all', await context.store.all());
      //   console.log('## models', models);

      //   const ex = await context.data.export.insomnia({
      //     includePrivate: false,
      //     format: 'json',
      //     workspace: models.workspace,
      //   });

      //   const workspaceObj = JSON.parse(ex);
      //   const workspaceData = workspaceObj.resources.find(
      //     el => el._type === 'workspace',
      //   );
      //   const {
      //     _id: workspaceId,
      //     name: workspaceName,
      //     modified: modifiedAt,
      //   } = workspaceData;

      //   await updateWorkspace(
      //     {
      //       workspaceId,
      //     },
      //     ex,
      //   );

      //   await updateDictionary({
      //     workspaceId,
      //     workspaceName,
      //     modifiedAt,
      //   });

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
];

export { workspaceActions };
