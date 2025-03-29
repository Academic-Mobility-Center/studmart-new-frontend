export function FileField({ 
  label,
  name,
  value,
  onChange
}: { 
  label: string,
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    return (
      <div className="flex flex-col gap-2 w-[350px]">
        <label className="text-sm text-[#032c28]">{label}</label>
        <input
          className="border border-gray-300 p-2 rounded-2xl focus:outline-none text-[#032c28]"
          name={name}
          type="file"
          value={value}
          onChange={onChange}
        />
      </div>
    );
  }
  