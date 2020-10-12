abstract class SyncProvider {
  private insomniaContext: IInsomniaContext;

  constructor(insomniaContext: IInsomniaContext) {
    this.insomniaContext = insomniaContext;
  }

  abstract async receive(): Promise<void>;

  abstract async send(): Promise<void>;

  protected async importToInsomnia(content: string): Promise<void> {
    await this.insomniaContext.data.import.raw(content);
  }

  protected async exportFromInsomnia(): Promise<string> {
    const data = await this.insomniaContext.data.export.insomnia({
      includePrivate: false,
      format: 'json',
    });
    return JSON.stringify(JSON.parse(data), null, 2);
  }
}

export default SyncProvider;
