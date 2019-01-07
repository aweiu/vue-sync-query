export type QueryValue = string | string[]

export interface SyncQueryOptions {
  include?: string[]
  exclude?: string[]
  dataToQuery?: (dataVal: any) => QueryValue
  queryToData?: (queryVal: QueryValue) => any
}

declare module 'vue/types/vue' {
    interface Vue {
      $syncQuery: (path: string, options?: SyncQueryOptions) => void
    }
}
