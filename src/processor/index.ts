import { IInsomniaExportType } from '../@types/enums';
import { IInsomniaExport } from '../@types/insomnia';

const doProcess = (response: IInsomniaExport) => {
  const { resources } = response;

  const workspaces = resources.filter(
    ({ _type: type }) => type === IInsomniaExportType.Workspace,
  );

  const workspaceItems = workspaces.map(workspace => {
    const { _id: workspaceId } = workspace;

    const items = resources.filter(({ parentId }) => parentId === workspaceId);

    const requests = items.filter(
      ({ _type: type }) => type === IInsomniaExportType.Request,
    );
    const requestGroups = items.filter(
      ({ _type: type }) => type === IInsomniaExportType.RequestGroup,
    );
    const environments = items.filter(
      ({ _type: type }) => type === IInsomniaExportType.Environment,
    );
    const cookie = items.find(
      ({ _type: type }) => type === IInsomniaExportType.Cookie,
    );
    const apiSpec = items.find(
      ({ _type: type }) => type === IInsomniaExportType.APISpec,
    );

    return {
      ...workspace,
      requests,
      requestGroups,
      environments,
      cookie,
      apiSpec,
    };
  });

  return workspaceItems;
};

export { doProcess };
