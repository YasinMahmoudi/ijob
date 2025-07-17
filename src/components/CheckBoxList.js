export default function CheckBoxList({ data, onGetValue, selectedItem }) {
  return (
    <ul className="scrollbar">
      {data?.map((item) => (
        <Item
          key={item.id}
          item={item}
          onGetValue={onGetValue}
          selectedItem={selectedItem}
        />
      ))}
    </ul>
  );
}

function Item({ item, onGetValue, selectedItem }) {
  return (
    <li>
      <input
        type="radio"
        name="radioinput"
        id={`${item.id}`}
        value={item.value}
        onChange={(e) => onGetValue?.(e.target.value)}
        checked={item.value === selectedItem}
      />
      <label htmlFor={`${item.id}`}> {item.title} </label>
    </li>
  );
}
