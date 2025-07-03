'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface PropsUseSearchParamsCustom {
  fields: string[];
}
export const useSearchParamsCustom = ({
  fields = [],
}: PropsUseSearchParamsCustom) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [inited, setInited] = useState<boolean>(false);
  const [params, setParams] = useState<{ [key: string]: string | number }>({});

  useEffect(() => {
    const _params = new URLSearchParams(searchParams.toString());

    const result: { [key: string]: string | number } = {};
    fields
      .filter((el) => _params.has(el))
      .forEach((el) => (result[el] = _params.get(el) || ''));
    setParams(result);
    setInited(true);
  }, []);

  useEffect(() => {
    if (inited == false) return;

    const from = searchParams.toString();
    const _params = new URLSearchParams(searchParams.toString());

    fields.forEach((el) => {
      if (params[el]) _params.set(el, String(params[el]));
      else _params.delete(el);
    });

    const to = _params.toString();
    if (from == to) return;
    router.push(`?${to}`, { scroll: false });
  }, [inited, params]);

  const set = (name: string, value: string | number) => {
    setParams((prev) => ({ ...prev, [name]: value }));
  };

  const remove = (name: string) => {
    setParams((prev) => {
      const result = { ...prev };
      delete result[name];
      return result;
    });
  };

  return {
    data: params,
    actions: { set, remove },
  };
};
