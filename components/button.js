// ...props is just an unpacked object with all possible parameters.
export default function button({ ...props }) {
  console.log('[button] rendered:')
   return (
    <button type={props.type} onClick={props.onClick} className="button">
        {props.children}
    </button>
  );
}
