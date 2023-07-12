interface CopyObject {
  source: string;
  target: string;
}

export interface GetCopyResponse extends Array<CopyObject> {}
