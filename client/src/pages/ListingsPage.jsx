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
        const url =
          debouncedQuery.trim().length > 0
            ? `${API_URL}/list?search=${encodeURIComponent(debouncedQuery.trim())}`
            : `${API_URL}/list`;

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
        <div className="d-flex align-items-center gap-3">
          <div className="text-white fw-semibold" style={{ fontSize: 18 }}>
            Game Listings
          </div>
          <div className="flex-grow-1" />
          <SearchBar value={query} onChange={setQuery} />
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
