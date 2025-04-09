import { Option } from '@/types/Option'
import { Combobox } from '@headlessui/react'
import { useState, useEffect } from 'react'
export function MultipleSelectField({
  label,
  options,
  value,
  name,
  onChange,
  width,
  labelFontSize,
  placeholder,
  isNeedRadio,
  onBlur,
  allRegions
}: {
  label: string
  options: Option[]
  value?: Option[]
  name: string
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
  width: number
  labelFontSize: number
  placeholder: string
  isNeedRadio?: boolean
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  allRegions: boolean

}) {
  const [query, setQuery] = useState('')
  const [showTags, setShowTags] = useState(!allRegions)
  const [regionMode, setRegionMode] = useState<'all' | 'specific'>(allRegions ? 'all' : 'specific');
  const isDisabled = isNeedRadio ? regionMode === 'all' : false

  const [selectedMultiple, setSelectedMultiple] = useState<Option[]>([])
  
  useEffect(() => {
    if (allRegions) {
      setSelectedMultiple(options);
    } else {
      setSelectedMultiple(Array.isArray(value) ? value : []);
    }
  }, [allRegions, options, value]);

  useEffect(() => {
    if (Array.isArray(value)) {
      const selected = options.filter((opt) =>
        value.some((v) => v.value === opt.value)
      )
      setSelectedMultiple(selected)
    }
  }, [value, options])
  

  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) =>
          option.label.toLowerCase().includes(query.toLowerCase())
        );

  const handleMultipleChange = (val: Option[]) => {
    setSelectedMultiple(val)
    if (onChange) {
      const event = {
        target: {
          name,
          value: val
        }
      } as unknown as React.ChangeEvent<HTMLSelectElement>
      onChange(event)
    }
  }
  const handleRegionModeChange = (mode: 'all' | 'specific') => {
    if (mode === regionMode) return
    setRegionMode(mode);

    if (mode === 'all') {
      setSelectedMultiple(options);
      if (onChange) {
        const events = [
          {
            target: {
              name: name,
              value: options
            }
          },
          {
            target: {
              name: 'allRegions',
              type: 'radio',
              checked: true
            }
          },
          {
            target: {
              name: 'specificRegions',
              type: 'radio',
              checked: false
            }
          }
        ] as unknown as React.ChangeEvent<HTMLSelectElement>[];
        
        events.forEach(event => onChange(event));
      }
    }
    if (mode === 'specific')
       {
      setSelectedMultiple([])      
      if (onChange) {
        const events = [
          {
            target: {
              name: name,
              value: [] 
            }
          },
          {
            target: {
              name: 'allRegions',
              type: 'radio',
              checked: false
            }
          },
          {
            target: {
              name: 'specificRegions',
              type: 'radio',
              checked: true
            }
          }
        ] as unknown as React.ChangeEvent<HTMLSelectElement>[];
        
        events.forEach(event => onChange(event));
      }
    }
  }

  return (
    <div className="flex flex-col gap-2 relative" style={{ width: `${width}px` }}>
      <label
        className="text-[#032c28]"
        style={{ fontSize: `${labelFontSize}px` }}
      >
        {label}
      </label>

      {isNeedRadio && (
        <div className="flex gap-4 mb-2">
          <label className="flex items-center gap-1 text-sm text-[#032c28]">
            <input
              type="radio"
              name={"allRegions"}
              checked={regionMode === 'all'}
              onChange={() => handleRegionModeChange('all')} 
                         />
            Все регионы
          </label>
          <label className="flex items-center gap-1 text-sm text-[#032c28]">
            <input
              type="radio"
              name={"specificRegions"}
              checked={regionMode === 'specific'}
              onChange={() => handleRegionModeChange('specific')}
                          />
            Конкретные регионы
          </label>
        </div>
      )}

      <Combobox
        value={selectedMultiple}
        onChange={handleMultipleChange}
        multiple
        name={name}
        disabled={isDisabled}
      >
        <div className="relative">
        <ComboboxInputBase
          value={selectedMultiple}
          isDisabled={isDisabled}
          placeholder={placeholder}
          setQuery={setQuery}
          displayValue={(value: string[]) => value.join(', ')}
          onBlur={onBlur}
        />
          {regionMode === 'specific' && selectedMultiple.length > 0 && ( 
            <SelectedTags
              selected={selectedMultiple}
              onRemove={(val) =>
                handleMultipleChange(selectedMultiple.filter((v) => v !== val))
              }
            />
          )}
        <ComboboxOptionsList
          options={filteredOptions}
          selected={selectedMultiple}
        />
        </div>
      </Combobox>
    </div>
  )
}

function ComboboxInputBase({
  value,
  isDisabled,
  placeholder,
  setQuery,
  displayValue,
  onBlur
}: {
  value: any
  isDisabled: boolean
  placeholder: string
  setQuery: (val: string) => void
  displayValue: (val: any) => string,
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void
}) {
  return (
    <div className="relative">
      <Combobox.Input
        className={`
          w-full pl-[20px] pr-10 border border-gray-300 p-2 
          rounded-2xl focus:outline-none h-[48px] 
          placeholder:text-[#888888]
          ${isDisabled ? 'bg-[#EFEFEF] cursor-not-allowed' : 'bg-white'}
          text-[#032C28]
        `}
        displayValue={() => ''}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={placeholder}
        disabled={isDisabled}
        onBlur={onBlur}
      />
      <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-3">
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </Combobox.Button>
    </div>
  )
}

function ComboboxOptionsList({
  options,
  selected,
}: {
  options: Option[]
  selected: Option[]
}) {
  return (
    <Combobox.Options
    className="absolute z-10 mt-1 max-h-60 
    min-w-full max-w-full
    overflow-auto rounded-2xl 
    bg-white py-1 shadow-lg ring-1 ring-black 
    ring-opacity-5 focus:outline-none"
    >
      {options.length === 0 ? (
        <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
          Ничего не найдено
        </div>
      ) : (
        options.map((option) => (
          <Combobox.Option
            key={option.value}
            value={option}
            className={({ active, selected }) =>
              `relative cursor-default select-none py-2 pl-4 pr-4 ${
                active ? 'bg-[#032c28] text-white' : 'text-[#032c28]'
              } ${selected ? 'font-semibold' : ''}`
            }
          >
            {option.label}
          </Combobox.Option>
        ))
      )}
    </Combobox.Options>
  )
}

function SelectedTags({
  selected,
  onRemove,
}: {
  selected: Option[]
  onRemove: (val: Option) => void
}) {
  if (selected.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {selected.map((item) => (
        <div
          key={item.value}
          className="flex items-center gap-1 bg-[#032C28] text-white text-sm px-3 py-1 rounded-full"
        >
          {item.label}
          <button
            type="button"
            onClick={() => onRemove(item)}
            className="ml-1 text-white hover:text-gray-300"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )
}
