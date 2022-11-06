/* use the object spread operator to accept any input value */
// export default function Input({ props }) {
//   console.log('[input] rendered:')
//    return (
//     <input {...props}
//       className="input"
//     />
//   );
// }

export default function Input({ type, value, required, onChange }) {
  console.log('[input] rendered:')
   return (
    <input type={type} value={value} required={required} onChange={onChange}
      className="input"
    />
  );
}
