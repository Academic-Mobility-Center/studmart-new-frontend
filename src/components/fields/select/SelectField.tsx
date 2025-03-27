export function SelectField({ label, options }: { label: string, options: string[] }) {
    return (
      <div className="flex flex-col gap-2 w-[350px]">
        <label className="text-sm text-[#032c28]">{label}</label>
        <select className="border border-gray-300 p-2 rounded-2xl focus:outline-none text-[#032c28]">
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }