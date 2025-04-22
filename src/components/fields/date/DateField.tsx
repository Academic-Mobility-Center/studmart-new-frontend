export function DateField({
   label,
   name,
   value,
   onChange, 
   width,
   labelFontSize,
   onBlur
  }: {
     label: string,
     name?: string,
     value?: string,
     onChange?:  (event: React.ChangeEvent<HTMLInputElement>) => void;
     width: number
     labelFontSize: number
     onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
     
  }) {
    return (
      <div className="flex flex-col gap-2" style={{ width: `${width}px` }}>
        <label 
          style={{ fontSize: `${labelFontSize}px` }}
          className=" text-[#032c28]"
        >{label}</label>
        <input
          className="pl-6 border border-gray-300 p-2 rounded-2xl focus:outline-none text-[#032c28] h-[48px] pr-4 bg-white"
          type="date"
          name={name}
          onChange={onChange}
          value={value}
          min="1960-01-01"
          max="2009-12-31"
          onBlur={onBlur}
        />
      </div>
    );
  }