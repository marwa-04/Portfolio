import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { fetchGitHub, type GhData } from "@/lib/github";

interface State {
  data: GhData | null;
  loading: boolean;
  error: string | null;
}

const Ctx = createContext<State>({ data: null, loading: true, error: null });

export function GitHubProvider({
  username,
  children,
}: {
  username: string;
  children: ReactNode;
}) {
  const [state, setState] = useState<State>({ data: null, loading: true, error: null });

  useEffect(() => {
    const ctrl = new AbortController();
    setState({ data: null, loading: true, error: null });
    fetchGitHub(username, ctrl.signal)
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((err) => {
        if (err.name === "AbortError") return;
        setState({ data: null, loading: false, error: err.message ?? "Failed" });
      });
    return () => ctrl.abort();
  }, [username]);

  return <Ctx.Provider value={state}>{children}</Ctx.Provider>;
}

export function useGitHubData() {
  return useContext(Ctx);
}
