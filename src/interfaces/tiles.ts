interface Tile {
  '@id': string;
  title: string;
  description: string;
}

export interface GetTilesResponse extends Array<Tile> {}

export interface GetTileResponse {
  properties: {
    title: {
      description: string;
      title: string;
      type: string;
    };
    [key: string]: unknown;
  };
  required: string[];
  title: string;
  type: string;
}
