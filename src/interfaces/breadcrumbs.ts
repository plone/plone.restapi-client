interface Item {
  '@id': string;
  title: string;
}

export interface BreadCrumbsResponse {
  '@id': string;
  items: Item;
  root: string;
}
