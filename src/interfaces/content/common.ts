export type Components =
  | 'actions'
  | 'aliases'
  | 'breadcrumbs'
  | 'contextnavigation'
  | 'navigation'
  | 'types'
  | 'workflow';

export type Block = {
  key: string;
  text: string;
  type: string;
  depth: number;
  inlineStyleRanges: any[];
  entityRanges: any[];
  data: any;
};
