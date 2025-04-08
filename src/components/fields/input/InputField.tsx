export default function InputField({ 
  label, 
  placeholder,
  name,
  value,
  onChange, 
  autoComplete,
  width = 350,
  labelFontSize = 14
}: { 
  label: string, 
  placeholder: string ,
  name?: string,
  value?: string,
  onChange?:  (event: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
  width: number,
  labelFontSize: number;
}) {
    return (
      <div className="flex flex-col gap-2" style={{width: `${width}px`}}>
        <label className="text-[#032c28]" style={{fontSize: `${labelFontSize}px`}}>{label}</label>
        <input 
          className="pl-[20px] border border-gray-300 p-2 rounded-2xl focus:outline-none text-[#032c28] placeholder:text-[#888888] h-[48px]" 
          type="text" 
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
        />
      </div>
    );
}