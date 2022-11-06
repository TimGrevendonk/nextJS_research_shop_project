export default function FormField({ label, children }) {
  console.log('[formfield] rendered:')
   return (
    <label className="formfield">
        <span>
            {label}
        </span>
        {children}
    </label>
  );
}
