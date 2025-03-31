import { useState } from "react";

export function FileField({ 
  label,
  name,
  onChange
}: { 
  label: string,
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const fileParts = file.name.split(".");
      const extension = fileParts.pop();
      const baseName = fileParts.join(".");
      const shortName = baseName.length > 10 ? baseName.slice(0, 25) + "..." : baseName;
      setFileName(`${shortName}.${extension}`);
    } else {
      setFileName("");
    }
    onChange(event);
  };

  return (
    <div className="flex flex-col gap-2 w-[350px]">
      <label className="text-sm text-[#032c28]">{label}</label>
      <div className="relative">
        <input
          id={name}
          type="file"
          className="hidden"
          name={name}
          onChange={handleFileChange}
        />
        <label
          htmlFor={name}
          className="pl-6 border border-gray-300 p-2 rounded-2xl text-[#032c28] h-[48px] cursor-pointer flex justify-between items-center"
        >
          {fileName || "Прикрепите файл"}
        </label>
      </div>
    </div>
  );
}