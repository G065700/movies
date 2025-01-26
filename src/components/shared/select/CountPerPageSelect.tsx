import { ChangeEvent } from 'react';

export default CountPerPageSelect;

interface SelectProps {
  name: string;
  value: string;
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

function CountPerPageSelect({ name, value, handleChange }: SelectProps) {
  return (
    <select
      name={name}
      value={value}
      onChange={handleChange}
      className="p-2 rounded-md outline-none"
    >
      <option value={'10'}>10개씩 보기</option>
      <option value={'20'}>20개씩 보기</option>
      <option value={'30'}>30개씩 보기</option>
    </select>
  );
}
