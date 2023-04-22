class PloneClient {
  private _data: {
    config: {
      apiURL: string;
    };
  } = { config: { apiURL: 'http://localhost:8080/Plone' } };

  static instance: InstanceType<typeof PloneClient>;

  constructor() {
    if (!PloneClient.instance) {
      PloneClient.instance = this;
    }

    return PloneClient.instance;
  }

  get config() {
    return this._data.config;
  }

  set config(config) {
    this._data.config = config;
  }
}

const instance = new PloneClient();
Object.freeze(instance);

export default instance;
