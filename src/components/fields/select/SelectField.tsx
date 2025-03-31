export function SelectField({ 
  label, 
  options, 
  value,
  name,
  onChange
}: { 
  label: string, 
  options: string[] ,
  value?: string,
  name: string,
  onChange?:  (event: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
    return (
      <div className="flex flex-col gap-2 w-[350px]">
        <label className="text-sm text-[#032c28]">{label}</label>
        <select 
          onChange={onChange}
          value={value || ""} 
          name={name} 
          className="pl-6 border border-gray-300 p-2 rounded-2xl focus:outline-none text-[#032c28] h-[48px] "
        >
          <option value="">Выберите значение</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }