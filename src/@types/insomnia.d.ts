enum IInsomniaDataType {
  Workspace = 'Workspace',
  Request = 'Request',
  RequestGroup = 'RequestGroup',
}

enum IInsomniaRequestMethod {
  GET = 'GET',
  POST = 'POST',
}

interface IInsomniaApp {
  dialog(title: string, html: HTMLElement): void;
}

interface IInsomniaStore {
  all(): Promise<Array<{ key: string; value: string }>>;
  hasItem(key: string): Promise<boolean>;
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
  clear(): Promise<void>;
}

interface IInsomniaModelRequest {
  _id: string;
  parentId: string | null;
  type: IInsomniaDataType;
  name: string;
  description: string;
  method: IInsomniaRequestMethod;
  url: string;
  headers: { [key: string]: [value: string] };
  authentication: { [key: string]: [value: string] };
  body: { [key: string]: [value: string] };
  parameters: Array<{ key: string; value: string }>;
  isPrivate: boolean;
  settingDisableRenderRequestBody: boolean;
  settingEncodeUrl: boolean;
  settingFollowRedirects: string;
  settingRebuildPath: boolean;
  settingSendCookies: boolean;
  settingStoreCookies: boolean;
  metaSortKey: number;
  modified: number;
  created: number;
}

interface IInsomniaModelRequestGroup {
  _id: string;
  type: IInsomniaDataType;
  name: string;
  description: string;
  parentId: string | null;
  environment: { [key: string]: [value: string] };
  environmentPropertyOrder: any | null;
  metaSortKey: number;
  modified: number;
  created: number;
}

interface IInsomniaModelWorkspace {
  _id: string;
  type: IInsomniaDataType;
  name: string;
  description: string;
  parentId: string | null;
  scope: string | null;
  modified: number;
  created: number;
}

interface IInsomniaModel {
  workspace: IInsomniaModelWorkspace;
}

interface IInsomniaDataImport {
  raw(content: string): Promise<void>;
}

interface IInsomniaDataExportOptions {
  includePrivate?: boolean;
  format?: 'json' | 'yaml';
  workspace?: IInsomniaModelWorkspace;
}

interface IInsomniaDataExport {
  insomnia(options: IInsomniaDataExportOptions): Promise<string>;
}

interface IInsomniaData {
  import: IInsomniaDataImport;
  export: IInsomniaDataExport;
}

interface IInsomniaContext {
  app: IInsomniaApp;
  store: IInsomniaStore;
  data: IInsomniaData;
}

interface IInsomniaWorkspaceActionFunction {
  (context: IInsomniaContext, models: IInsomniaModel): void;
}

interface IInsomniaWorkspaceAction {
  label: string;
  icon: string;
  action: IInsomniaWorkspaceActionFunction;
}

enum IInsomniaExportType {
  Export = 'export',
  Workspace = 'workspace',
  Request = 'request',
  RequestGroup = 'request_group',
  Environment = 'environment',
  Cookie = 'cookie_jar',
  APISpec = 'api_spec',
}

interface IInsomniaExport {
  resources: [IInsomniaExportResource];
  _type: IInsomniaExportType;
  ['__export_date']: Date;
  ['__export_format']: number;
  ['__export_source']: string;
}

interface IInsomniaExportResourceBase {
  _id: string;
  _type: IInsomniaExportType;
  parentId: string | null;
  name: string;
  modified: number;
  created: number;
}

interface IInsomniaExportResourceWorkspace extends IInsomniaExportResourceBase {
  description: string;
  scope: any | null;
}

interface IInsomniaExportResourceEnvironment
  extends IInsomniaExportResourceBase {
  color: string;
  data: { [key: string]: [value: string] };
  dataPropertyOrder: any;
  isPrivate: boolean;
  metaSortKey?: number;
}

interface IInsomniaExportResourceCookie {
  id: string;
  key: string;
  path: string;
  secure: boolean;
  value: string;
  lastAccessed: string;
  creation: string;
  domain: string;
  expires: string;
  hostOnly: boolean;
}

interface IInsomniaExportResourceCookieJar extends IInsomniaExportResourceBase {
  cookies: IInsomniaExportResourceCookie[];
}

interface IInsomniaExportResourceAPISpec extends IInsomniaExportResourceBase {
  contentType: string;
  contents: string;
  fileName: string;
}

interface IInsomniaExportResourceRequestGroup
  extends IInsomniaExportResourceBase {
  description: string;
  environment?: { [key: string]: [value: string] };
  environmentPropertyOrder?: any | null;
  metaSortKey?: number;
}

interface IInsomniaRequestHeader {
  id: string;
  name: string;
  description: string;
  value: string;
}

interface IInsomniaRequestBodyParam {
  id: string;
  name: string;
  type?: string;
  description: string;
  fileName?: string;
  value: string;
}

interface IInsomniaExportResourceRequest extends IInsomniaExportResourceBase {
  description: string;
  method: string;
  url: string;
  headers: IInsomniaRequestHeader[];
  authentication: any /* {... } */;
  body: {
    mimeType: string;
    text?: string;
    params?: IInsomniaRequestBodyParam[];
  };
  isPrivate: boolean;
  parameters: IInsomniaRequestHeader[];
  settingDisableRenderRequestBody: boolean;
  settingEncodeUrl: boolean;
  settingFollowRedirects: string;
  settingRebuildPath: boolean;
  settingSendCookies: boolean;
  settingStoreCookies: boolean;
}

interface IInsomniaExportResource
  extends IInsomniaExportResourceWorkspace,
    IInsomniaExportResourceEnvironment,
    IInsomniaExportResourceCookieJar,
    IInsomniaExportResourceAPISpec,
    IInsomniaExportResourceRequest,
    IInsomniaExportResourceRequestGroup {}
