export function DateField({
   label,
   name,
   value,
   onChange, 
  }: {
     label: string,
     name?: string,
     value?: string,
     onChange?:  (event: React.ChangeEvent<HTMLInputElement>) => void;
  }) {
    return (
      <div className="flex flex-col gap-2 w-[350px]">
        <label className="text-sm text-[#032c28]">{label}</label>
        <input
          className="pl-6 border border-gray-300 p-2 rounded-2xl focus:outline-none text-[#032c28] h-[48px] pr-4"
          type="date"
          name={name}
          onChange={onChange}
          value={value}
          min="1960-01-01"
          max="2009-12-31"
        />
      </div>
    );
  }