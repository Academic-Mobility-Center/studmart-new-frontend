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
  const [regionMode, setRegionMode] = useState<'all' | 'specific'>(allRegions ? 'all' : 'specific');
  const isDisabled = isNeedRadio ? regionMode === 'all' : false

  const [selectedMultiple, setSelectedMultiple] = useState<Option[]>(value || [])
  
  useEffect(() => {
    if (value) {
      setSelectedMultiple(value)
    }
  }, [value])

  useEffect(() => {
    setRegionMode(allRegions ? 'all' : 'specific')
  }, [allRegions])

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
    setRegionMode(mode)
    const events = [
      {
        target: {
          name: 'allRegions',
          type: 'radio',
          checked: mode === 'all'
        }
      },
      {
        target: {
          name: 'specificRegions',
          type: 'radio',
          checked: mode === 'specific'
        }
      }
    ] as unknown as React.ChangeEvent<HTMLSelectElement>[]
    if (mode === 'all') {
      setSelectedMultiple(options)
      events.push({
        target: {
          name,
          value: options
        }
      } as unknown as React.ChangeEvent<HTMLSelectElement>)
    } else {
      setSelectedMultiple([])
      events.push({
        target: {
          name,
          value: []
        }
      } as unknown as React.ChangeEvent<HTMLSelectElement>)
    }
    events.forEach((event) => onChange?.(event))
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
          displayValue={(value: Option[]) => value.map(v => v.label).join(', ')}
          onBlur={onBlur}
        />
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
  onBlur
}: {
  value: Option[]
  isDisabled: boolean
  placeholder: string
  setQuery: (val: string) => void
  displayValue: (val: Option[]) => string
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void
}) {
  return (
    <div
      className={`
        flex flex-wrap items-center gap-2 min-h-[48px]
        w-full border border-gray-300 rounded-2xl px-4 py-2
        ${isDisabled ? 'bg-[#EFEFEF] cursor-not-allowed text-[#A0A0A0]' : 'bg-white text-[#032C28]'}
      `}
    >
      {!isDisabled && value.map((item, index) => (
        <div
          key={`${item.value}-${index}`}
          className="flex items-center bg-[#e6f4f1] text-[#032c28] px-3 py-1 rounded-full text-sm"
        >
          {item.label}
        </div>
      ))}
      
      <Combobox.Input
        className={`
          flex-1 min-w-[120px] border-none focus:outline-none placeholder:text-[#888888]
          ${isDisabled ? 'bg-[#EFEFEF] cursor-not-allowed text-[#A0A0A0]' : 'bg-white text-[#032C28]'}
        `}
        displayValue={() => ''}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={placeholder}
        disabled={isDisabled}
        onBlur={onBlur}
      />

      {!isDisabled && (
        <Combobox.Button className="ml-auto">
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
      )}
    </div>
  )
}


// function ComboboxInputBase({
//   value,  
//   isDisabled,
//   placeholder,
//   setQuery,
//   displayValue, 
//   onBlur
// }: {
//   value: Option[]  
//   isDisabled: boolean
//   placeholder: string
//   setQuery: (val: string) => void
//   displayValue: (val: Option[]) => string,  
//   onBlur: (event: React.FocusEvent<HTMLInputElement>) => void
// }) {
//   return (
//     <div className="relative">
//       <Combobox.Input
//         className={`
//           w-full pl-[20px] pr-10 border border-gray-300 p-2 
//           rounded-2xl focus:outline-none h-[48px] 
//           placeholder:text-[#888888]
//           ${isDisabled ? 'bg-[#EFEFEF] cursor-not-allowed text-[#EFEFEF]' : 'bg-white text-[#032C28]'}
//         `}
//         displayValue={() => displayValue(value)} 
//         onChange={(event) => setQuery(event.target.value)}
//         placeholder={placeholder}
//         disabled={isDisabled}
//         onBlur={onBlur}
//       />
//       <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-3">
//         <svg
//           className="w-5 h-5 text-gray-400"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             d="M19 9l-7 7-7-7"
//           />
//         </svg>
//       </Combobox.Button>
//     </div>
//   )
// }

function ComboboxOptionsList({
  options,

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

// import { Option } from '@/types/Option'
// import { useState, useEffect } from 'react'
// import { 
//   Box, 
//   OutlinedInput, 
//   MenuItem, 
//   FormControl, 
//   Select, 
//   Checkbox, 
//   ListItemText, 
//   RadioGroup, 
//   FormControlLabel, 
//   Radio, 
//   SelectChangeEvent 
// } from '@mui/material'

// export function MultipleSelectField({
//   label,
//   options,
//   value,
//   name,
//   onChange,
//   width,
//   labelFontSize,
//   placeholder,
//   isNeedRadio,
//   onBlur,
//   allRegions
// }: {
//   label: string
//   options: Option[]
//   value?: Option[]
//   name: string
//   onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
//   width: number
//   labelFontSize: number
//   placeholder: string
//   isNeedRadio?: boolean
//   onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
//   allRegions: boolean
// }) {
//   const [query, setQuery] = useState('')
//   const [regionMode, setRegionMode] = useState<'all' | 'specific'>(allRegions ? 'all' : 'specific')
//   const isDisabled = isNeedRadio ? regionMode === 'all' : false

//   const [selectedMultiple, setSelectedMultiple] = useState<Option[]>(value || [])

//   useEffect(() => {
//     if (value) {
//       setSelectedMultiple(value)
//     }
//   }, [value])

//   useEffect(() => {
//     setRegionMode(allRegions ? 'all' : 'specific')
//   }, [allRegions])

//   const filteredOptions =
//     query === ''
//       ? options
//       : options.filter((option) =>
//           option.label.toLowerCase().includes(query.toLowerCase())
//         )

//   const handleMultipleChange = (event: SelectChangeEvent<typeof selectedMultiple>) => {
//     const selected = event.target.value as Option[]
//     setSelectedMultiple(selected)
//     if (onChange) {
//       onChange({
//         target: { name, value: selected }
//       } as unknown as React.ChangeEvent<HTMLSelectElement>)
//     }
//   }

//   const handleRegionModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const mode = event.target.value as 'all' | 'specific'
//     if (mode === regionMode) return
//     setRegionMode(mode)
//     if (mode === 'all') {
//       setSelectedMultiple(options)
//       onChange?.({
//         target: { name, value: options }
//       } as unknown as React.ChangeEvent<HTMLSelectElement>)
//     } else {
//       setSelectedMultiple([])
//       onChange?.({
//         target: { name, value: [] }
//       } as unknown as React.ChangeEvent<HTMLSelectElement>)
//     }
//   }

//   return (
//     <Box className="flex flex-col gap-2 relative" style={{ width: `${width}px` }}>
//       <label style={{ fontSize: `${labelFontSize}px`, color: '#032c28' }}>{label}</label>

//       {isNeedRadio && (
//         <FormControl component="fieldset" style={{ marginBottom: '10px' }}>
//           <RadioGroup
//             row
//             value={regionMode}
//             onChange={handleRegionModeChange}
//           >
//             <FormControlLabel
//               value="all"
//               control={<Radio />}
//               label="Все регионы"
//               style={{ fontSize: '14px', color: "#032C28" }}
//             />
//             <FormControlLabel
//               value="specific"
//               control={<Radio />}
//               label="Конкретные регионы"
//               style={{ fontSize: '14px',  color: "#032C28" }}
//             />
//           </RadioGroup>
//         </FormControl>
//       )}

//       <FormControl fullWidth variant="outlined" disabled={isDisabled}>
//         <Select
//           multiple
//           value={selectedMultiple}
//           onChange={handleMultipleChange}
//           name={name}
//           input={<OutlinedInput />}
//           displayEmpty
//           renderValue={(selected) => (selected as Option[]).map((v) => v.label).join(', ')}
//           onBlur={onBlur}
//           MenuProps={{
//             PaperProps: {
//               style: {
//                 maxHeight: 200,
//                 width: 'auto',
//                 color: "#032C28"
//               },
//             },
//           }}
//           style={{
//             backgroundColor: regionMode === 'all' ? '#EFEFEF' : 'white',  // Изменение фона для всех регионов
//             color: regionMode === 'all' ? '#B0B0B0' : '#032C28',  // Цвет текста при всех регионах
//           }}
//         >
//           {filteredOptions.map((option) => (
//             <MenuItem key={option.value} value={option.value}>
//               <Checkbox checked={selectedMultiple.includes(option)} />
//               <ListItemText primary={option.label} />
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//     </Box>
//   )
// }
