import { useState, useCallback } from "react";

type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface Props<TBody = unknown> {
  url: string;
  method?: HTTPMethod;
  body?: TBody;
  headers?: HeadersInit;
}

const useFetch = <TResponse = unknown, TBody = unknown>() => {
  const [data, setData] = useState<TResponse | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const trigger = useCallback(
    async ({
      url,
      method = "GET",
      body,
      headers = { "Content-Type": "application/json" },
    }: Props<TBody>) => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(url, {
          method,
          headers,
          ...(method !== "GET" && body ? { body: JSON.stringify(body) } : {}),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const contentType = response.headers.get("Content-Type");
        if (contentType?.includes("application/json")) {
          const result = await response.json();
          setData(result);
        } else {
          setData(null); // no content
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { data, trigger, loading, error };
};

export default useFetch;
