export const OptionsSelect: preact.FunctionalComponent<{
  data: string;
  options: { label: string; value: string }[];
  handleChange: (data: string) => void;
}> = ({ data, options, handleChange }) => (
  <select
    value={data}
    onChange={(e) => {
      handleChange(e.currentTarget.value);
    }}
  >
    {options.map(({ label, value }) => (
      <option key={value} value={value}>
        {label}
      </option>
    ))}
  </select>
);
