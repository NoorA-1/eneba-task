import { useEffect, useState } from "react";
import SearchBar from "../ui/SearchBar";
import ListingGrid from "../ui/ListingGrid";
import { useDebouncedValue } from "../hooks/useDebouncedValue";

const API_URL = import.meta.env.VITE_API_URL;

export default function ListingsPage() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 300);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setErrorText("");

      try {
        const base = import.meta.env.VITE_API_URL || "";
        const url =
          debouncedQuery.trim().length > 0
            ? `${base}/list?search=${encodeURIComponent(debouncedQuery.trim())}`
            : `${base}/list`;

        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();

        // your backend returns { count, items }
        const nextItems = Array.isArray(data.items) ? data.items : data;

        if (!cancelled) setItems(nextItems);
      } catch (e) {
        if (!cancelled) setErrorText("Failed to load listings.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [debouncedQuery]);

  return (
    <div className="page-wrap">
      <div className="topbar mb-4">
        <div className="topbar-row">
          <img
            src="https://static.eneba.games/branding/v2/logoFull.svg"
            alt="Eneba"
            className="topbar-logo d-none d-md-block"
          />

          <div className="topbar-search">
            <SearchBar value={query} onChange={setQuery} />
          </div>

          <div className="lang d-none d-sm-flex">
            <img
              src="https://static.eneba.games/flags/lang/v2/lithuania.svg"
              alt="lithuania"
              height="16"
              width="16"
            />
            <p className="m-0 text-light">English EU | EUR</p>
          </div>

          {/* pushes this to the far right */}
          <div className="icons ms-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              fill="currentColor"
              className="bi bi-heart"
              viewBox="0 0 16 16"
            >
              <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              fill="currentColor"
              className="bi bi-cart"
              viewBox="0 0 16 16"
            >
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
            </svg>

            <img
              src="https://imagedelivery.net/LBWXYQ-XnKSYxbZ-NuYGqQ/5297e1b6-0d34-4d78-1235-211ebe5c6300/avatarhd"
              alt="avatar"
              className="avatar"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="d-flex align-items-center gap-2 text-white">
          <div className="spinner-border spinner-border-sm" role="status" />
          <div>Loading...</div>
        </div>
      ) : errorText ? (
        <div className="alert alert-danger">{errorText}</div>
      ) : items.length === 0 ? (
        <div className="text-white">No results</div>
      ) : (
        <ListingGrid items={items} />
      )}
    </div>
  );
}
