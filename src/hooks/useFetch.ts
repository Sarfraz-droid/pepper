import { useCallback, useEffect, useState } from "react";
import { getErrorMessage, instance } from "@/utils/app/axiosInstance";

type State<T> = {
  data: T[] | null;
  loading: boolean;
  error: string | null;
};

/** Loads a JSON list; `revalidate` refreshes it without blanking the UI. */
function useFetch<T>(url: string) {
  const [state, setState] = useState<State<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const load = useCallback(async () => {
    try {
      const { data } = await instance.get<T[]>(url);
      setState({ data, loading: false, error: null });
    } catch (err) {
      setState((prev) => ({ ...prev, loading: false, error: getErrorMessage(err) }));
    }
  }, [url]);

  useEffect(() => {
    load();
  }, [load]);

  return [state, { revalidate: load }] as const;
}

export default useFetch;
