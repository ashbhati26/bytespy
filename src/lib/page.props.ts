// lib/types.ts
export type PageParams = {
    url?: string[];
  };
  
  export type PageProps<T = {}> = {
    params: PageParams;
  } & T;
  