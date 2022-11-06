export default function button({ type, children }) {
  console.log('[button] rendered:')
   return (
    <button type={type} className="button">
        {children}
    </button>
  );
}
