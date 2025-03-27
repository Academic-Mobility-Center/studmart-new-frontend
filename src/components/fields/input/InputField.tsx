export default function InputField({ label, placeholder }: { label: string, placeholder: string }) {
    return (
      <div className="flex flex-col gap-2 w-[350px]">
        <label className="text-sm text-[#032c28]">{label}</label>
        <input 
          className="border border-gray-300 p-2 rounded-2xl focus:outline-none text-[#032c28] placeholder:text-[#888888]" 
          type="text" 
          placeholder={placeholder}
          
        />
      </div>
    );
}