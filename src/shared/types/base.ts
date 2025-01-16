export namespace Base {
  export namespace Inputs {}
  export namespace Args {
    export type FindMany = {
      skip?: number;
      take?: number;
    };
  }
  export type PaginationResponse = {
    data: unknown;
    meta: PaginationMeta;
  };
  export type PaginationMeta = {
    total: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
    prev: number | null;
    next: number | null;
  };
}
