export const CheckboxList: preact.FunctionComponent<{
  data: string[];
  choises: {
    key: string;
    label: string;
    value: string;
    handleCheck: () => void;
    handleUncheck: () => void;
  }[];
}> = ({ choises, data: result }) => {
  return (
    <>
      {choises.map((choise) => (
        <label key={choise.key}>
          <input
            type="checkbox"
            checked={result.includes(choise.value)}
            onClick={(e) => {
              if (e.currentTarget.checked) {
                choise.handleCheck();
              } else {
                choise.handleUncheck();
              }
            }}
          />
          {choise.label}
        </label>
      ))}
    </>
  );
};
