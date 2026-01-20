function formatPrice(value) {
  if (value == null) return "";
  // value comes as string from backend ("19.99")
  const n = Number(value);
  if (Number.isFinite(n)) return n.toFixed(2);
  return String(value);
}

export default function ListingCard({ item }) {
  const cover = item.game?.coverUrl;

  const current = formatPrice(item.priceCurrent);
  const old = item.priceOld ? formatPrice(item.priceOld) : null;

  return (
    <div className="card h-100 shadow-sm listing-card">
      <div className="listing-media">
        {cover ? (
          <div className="image-wrap">
            <img src={cover} alt={item.title} />
          </div>
        ) : null}
      </div>

      <div className="card-body d-flex flex-column listing-body">
        <div className="listing-title fw-semibold">{item.title}</div>

        <div className="listing-region fw-bold">{item.region}</div>

        <div className="listing-row listing-old-discount">
          {old ? (
            <div className="text-decoration-line-through listing-old">
              €{old}
            </div>
          ) : (
            <span className="listing-placeholder" />
          )}

          {typeof item.discountPct === "number" ? (
            <span className="green-text fw-bold">-{item.discountPct}%</span>
          ) : (
            <span className="listing-placeholder" />
          )}
        </div>

        <div className="fw-bold" style={{ fontSize: "1.4em" }}>
          €{current}
        </div>

        <div className="listing-row listing-cashback">
          {item.cashback ? (
            <span className="green-text fw-bold">
              Cashback: €{formatPrice(item.cashback)}
            </span>
          ) : (
            <span className="listing-placeholder" />
          )}
        </div>

        <span className="text-light listing-likes mt-auto align-self-start d-flex align-items-center gap-1">
          <span
            className="listing-old"
            style={{ cursor: "pointer", paddingBottom: "2px" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="13"
              fill="currentColor"
              class="bi bi-heart"
              viewBox="0 0 16 16"
            >
              <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
            </svg>
          </span>{" "}
          {item.likes}
        </span>
      </div>
    </div>
  );
}
