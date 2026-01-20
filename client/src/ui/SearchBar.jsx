export default function SearchBar({ value, onChange }) {
  return (
    <input
      className="form-control"
      style={{ width: 360, borderRadius: 12 }}
      placeholder="Search games..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
