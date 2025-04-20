import { Combobox } from '@headlessui/react'
import { useState, useEffect } from 'react'
type Option = {
  label: string;
  value: string;
};
export function SelectField({
  label,
  options,
  value,
  name,
  onChange,
  width,
  labelFontSize,
  placeholder,
  onBlur,
  disabled
}: {
  label: string
  options: Option[]
  value?: Option | undefined;
  name: string
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
  width: number
  labelFontSize: number
  placeholder: string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean | undefined
}) {
  const [selectedOption, setSelectedOption] = useState<Option | null>(
    value || null  // Используем значение из пропсов напрямую
  );

  const [query, setQuery] = useState('')

  useEffect(() => {
    setSelectedOption(value || null);
  }, [value]);

  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) =>
          option.label.toLowerCase().includes(query.toLowerCase())
        );

        const handleChange = (selected: Option) => {
          setSelectedOption(selected);
          if (onChange) {
            const event = {
              target: {
                name,
                value: selected.value,
              },
            } as React.ChangeEvent<HTMLSelectElement>;
            onChange(event);
          }
        };

  return (
    <div className="flex flex-col gap-2" style={{ width: `${width}px` }}>
      <label
        className="text-[#032c28]"
        style={{ fontSize: `${labelFontSize}px` }}
      >
        {label}
      </label>
      <Combobox 
        value={selectedOption}
        onChange={handleChange} 
      >
        <div className="relative">
          <Combobox.Input
            className={`w-full pl-[20px] pr-10 border 
              border-gray-300 p-2 rounded-2xl 
              focus:outline-none h-[48px] ${
              selectedOption ? 'text-[#032c28]' : 'text-gray-500 placeholder:text-[#888888]' 
            } 
            `}
            displayValue={(option: Option) => option?.label || ''}
            onChange={(event) => {
              const inputValue = event.target.value;
              setQuery(inputValue);
              if (inputValue === '') {
                setSelectedOption(null);
                if (onChange) {
                  const emptyEvent = {
                    target: {
                      name,
                      value: '',
                    },
                  } as React.ChangeEvent<HTMLSelectElement>;
                  onChange(emptyEvent);
                }
              }
            }}
            placeholder={placeholder}
            name={name}
            onBlur={onBlur}
            disabled={disabled}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </Combobox.Button>
          <Combobox.Options 
            className="absolute z-10 mt-1 max-h-60 w-full 
            overflow-auto rounded-2xl 
            bg-white py-1 shadow-lg ring-1 ring-black 
            ring-opacity-5 focus:outline-none"
          >
            {filteredOptions.length === 0 && query !== '' ? (
              <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                Ничего не найдено
              </div>
            ) : (
              filteredOptions.map((option) => (
                <Combobox.Option
                  key={option.value}
                  value={option}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-4 pr-4 ${
                      active ? 'bg-[#032c28] text-white' : 'text-[#032c28]'
                    }`
                  }
                >
                  {option.label}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </div>
      </Combobox>
    </div>
  )
}

