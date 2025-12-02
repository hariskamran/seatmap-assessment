'use client';

import React, { PropsWithChildren, ReactElement } from 'react';

import { SWRConfig } from 'swr';

function MainLayout({ children }: PropsWithChildren): ReactElement {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        refreshInterval: 15000,
        fetcher: (resource: string, init?: RequestInit): Promise<unknown> =>
          fetch(resource, { ...init, credentials: 'include' }).then(
            (res: Response): Promise<unknown> => {
              if (!res.ok) {
                throw new Error(`Error: ${res.statusText}`);
              }
              return res.json();
            },
          ),
      }}
    >
      <main className="bg-background">{children}</main>
    </SWRConfig>
  );
}

export default MainLayout;
