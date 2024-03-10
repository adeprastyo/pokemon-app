export type IResponse<TResults = []> = {
  count: string;
  next: string;
  previous: string | null;
  results: TResults;
};
