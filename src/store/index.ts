/* eslint-disable react/static-property-placement */
class Store {
  context: IInsomniaContext;

  constructor(mContext: IInsomniaContext) {
    this.context = mContext;
  }

  async getFromInsomniaStore(item: string): string {
    try {
      const value = await this.context.store.getItem(item);
      return value || '';
    } catch (err) {
      return '';
    }
  }

  async getAPIToken(): Promise<string> {
    return this.getFromInsomniaStore('mi:workspace:git:api-token');
  }

  setAPIToken = (value: string) => {
    return this.context.store.setItem('mi:workspace:git:api-token', value);
  };

  async getRepoOwner(): Promise<string> {
    return this.getFromInsomniaStore('mi:workspace:git:repo-owner');
  }

  setRepoOwner = (value: string) => {
    return this.context.store.setItem('mi:workspace:git:repo-owner', value);
  };

  async getRepoName(): Promise<string> {
    return this.getFromInsomniaStore('mi:workspace:git:repo-name');
  }

  setRepoName = (value: string) => {
    return this.context.store.setItem('mi:workspace:git:repo-name', value);
  };
}

export default Store;
