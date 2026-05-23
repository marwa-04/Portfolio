import { useEffect, useState } from "react";
import { fetchGitHub, type GhData } from "@/lib/github";

interface State {
  data: GhData | null;
  loading: boolean;
  error: string | null;
}

export function useGitHub(username: string) {
  const [state, setState] = useState<State>({ data: null, loading: true, error: null });

  useEffect(() => {
    const ctrl = new AbortController();
    setState((s) => ({ ...s, loading: true, error: null }));
    fetchGitHub(username, ctrl.signal)
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((err) => {
        if (err.name === "AbortError") return;
        setState({ data: null, loading: false, error: err.message ?? "Failed to load" });
      });
    return () => ctrl.abort();
  }, [username]);

  return state;
}
