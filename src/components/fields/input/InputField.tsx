export default function InputField({ 
  label, 
  placeholder,
  name,
  value,
  onChange 
}: { 
  label: string, 
  placeholder: string ,
  name?: string,
  value?: string,
  onChange?:  (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    return (
      <div className="flex flex-col gap-2 w-[350px]">
        <label className="text-sm text-[#032c28]">{label}</label>
        <input 
          className="pl-6 border border-gray-300 p-2 rounded-2xl focus:outline-none text-[#032c28] placeholder:text-[#888888] h-[48px]" 
          type="text" 
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          autoComplete="off"
        />
      </div>
    );
}