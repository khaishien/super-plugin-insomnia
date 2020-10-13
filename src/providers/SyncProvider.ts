import { IInsomniaContext } from '../@types/insomnia';

abstract class SyncProvider {
  protected insomniaContext: IInsomniaContext;

  constructor(insomniaContext: IInsomniaContext) {
    this.insomniaContext = insomniaContext;
  }

  abstract async pull(): Promise<void>;

  abstract async push(): Promise<void>;

  public async importToInsomnia(content: IDataContent): Promise<void> {
    if (content?.data) {
      let { data } = content;
      if (typeof data === 'object') {
        data = JSON.stringify(data);
      }

      await this.insomniaContext.data.import.raw(data);
    }
  }

  protected async exportFromInsomnia(): Promise<IDataContent> {
    const data = await this.insomniaContext.data.export.insomnia({
      includePrivate: false,
      format: 'json',
    });
    return { data: JSON.parse(data) };
  }
}

export default SyncProvider;
