export function DateField({ label }: { label: string }) {
    return (
      <div className="flex flex-col gap-2 w-[350px]">
        <label className="text-sm text-[#032c28]">{label}</label>
        <input
          className="border border-gray-300 p-2 rounded-2xl focus:outline-none text-[#032c28]"
          type="date"
        />
      </div>
    );
  }