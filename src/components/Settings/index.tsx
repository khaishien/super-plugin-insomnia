import * as React from 'react';

import Store from '../../store';
import Input from '../Input';
import Button from '../Button';
import {
  containerStyle,
  formContainerStyle,
  actionsContainerStyle,
} from './styles';

interface SettingsProps {
  insomniaContext: IInsomniaContext;
}

const Settings: React.FC<SettingsProps> = ({ insomniaContext }) => {
  const store = new Store(insomniaContext);

  const [apiToken, setAPIToken] = React.useState<string | null>(null);
  const [repoOwner, setRepoOwner] = React.useState<string | null>(null);
  const [repoName, setRepoName] = React.useState<string | null>(null);

  const init = async () => {
    const apiTokenFromStore = await store.getAPIToken();
    const repoOwnerFromStore = await store.getRepoOwner();
    const repoNameFromStore = await store.getRepoName();

    setAPIToken(apiTokenFromStore);
    setRepoOwner(repoOwnerFromStore);
    setRepoName(repoNameFromStore);
  };

  React.useEffect(() => {
    init();
  }, []);

  const onClickConfirm = async () => {
    await store.setAPIToken(apiToken ?? '');
    await store.setRepoOwner(repoOwner ?? '');
    await store.setRepoName(repoName ?? '');
  };

  return (
    <div css={containerStyle}>
      <Input
        label="Github API Token"
        value={apiToken}
        onChange={event => setAPIToken(event.target.value)}
      />

      <div css={formContainerStyle}>
        <div>
          <Input
            label="Repo Owner"
            value={repoOwner}
            onChange={event => setRepoOwner(event.target.value)}
          />
        </div>
        <div>
          <Input
            label="Repo Name"
            value={repoName}
            onChange={event => setRepoName(event.target.value)}
          />
        </div>
      </div>

      <div css={actionsContainerStyle}>
        <div style={{ marginRight: 10 }}>
          <Button label="Cancel" closeModal />
        </div>
        <Button label="Save" onClick={onClickConfirm} closeModal />
      </div>
    </div>
  );
};

export default Settings;
