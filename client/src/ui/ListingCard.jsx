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
    <div className="card h-100 shadow-sm" style={{ overflow: "hidden" }}>
      <div
        style={{
          height: "30vh",
          background: "#111",
        }}
      >
        {cover ? (
          <div className="image-wrap">
            <img src={cover} alt={item.title} />
          </div>
        ) : null}
      </div>

      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start gap-2">
          <div className="fw-semibold" style={{ lineHeight: 1.2 }}>
            {item.title}
          </div>
        </div>

        <div
          className="mt-1 fw-bold"
          style={{ fontSize: "0.9em", color: "#25c59b" }}
        >
          {item.region}
        </div>

        <div className="d-flex align-items-center mt-2 gap-2">
          {old ? (
            <div
              className="text-decoration-line-through"
              style={{ color: "#b3aac9" }}
            >
              €{old}
            </div>
          ) : null}
          <span>
            {typeof item.discountPct === "number" ? (
              <span className="green-text fw-bold">-{item.discountPct}%</span>
            ) : null}
          </span>
        </div>
        <div className="fw-bold" style={{ fontSize: 18 }}>
          €{current}
        </div>

        {item.cashback ? (
          <div className="mb-1">
            <span className="green-text fw-bold">
              Cashback: €{formatPrice(item.cashback)}
            </span>
          </div>
        ) : null}

        <span className="badge text-bg-light mt-auto align-self-start">
          {item.likes}{" "}
          <span style={{ color: "#e11d48", paddingLeft: "0.3em" }}>❤</span>
        </span>
      </div>
    </div>
  );
}
