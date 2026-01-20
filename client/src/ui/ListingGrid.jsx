import ListingCard from "./ListingCard";

export default function ListingGrid({ items }) {
  return (
    <div className="row g-3">
      {items.map((it) => (
        <div key={it.id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
          <ListingCard item={it} />
        </div>
      ))}
    </div>
  );
}
