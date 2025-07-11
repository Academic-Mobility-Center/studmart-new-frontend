import React, { useState } from 'react';

import { Autocomplete, Box, TextField } from '@mui/material';

interface Option {
	label: string;
	value: string;
}

interface CompactSearchInputProps {
	placeholder: string;
	options: Option[];
	disabled?: boolean;
	handleChange: (event: React.SyntheticEvent, newValue: Option | null) => void;
}

export default function CompactSearchInput({
	placeholder,
	options,
	disabled = false,
	handleChange,
}: CompactSearchInputProps) {
	const [inputValue, setInputValue] = useState('');

	const sortedOptions = [...options].sort((a, b) =>
		a.label.localeCompare(b.label, 'ru', { sensitivity: 'base' }),
	);

	return (
		<Box sx={{ width: '201px' }}>
			<Autocomplete
				disablePortal
				disabled={disabled}
				options={sortedOptions}
				onChange={handleChange}
				inputValue={inputValue}
				onInputChange={(event, newInputValue) => {
					setInputValue(newInputValue);
				}}
				getOptionLabel={(option) => option.label}
				isOptionEqualToValue={(option, val) => option.value === val?.value}
				clearOnEscape
				// Показывать крестик только если есть текст
				clearIcon={inputValue ? <span style={{ fontSize: 18, cursor: 'pointer' }}>×</span> : null}
				size="small"
				popupIcon={null} // скрываем треугольник
				renderInput={(params) => (
					<TextField
						{...params}
						placeholder={placeholder}
						variant="standard"
						InputProps={{
							...params.InputProps,
							disableUnderline: false,
							sx: {
								opacity: '50%',
								fontSize: 14,
								color: '#032c28',
								'&:before': {
									borderBottom: '1px solid #032c28',
								},
								'&:hover:not(.Mui-disabled, .Mui-error):before': {
									borderBottom: '1px solid #032c28',
								},
								'&.Mui-focused:after': {
									borderBottom: '2px solid #032c28', // цвет при фокусе
								},
								'& input::placeholder': {
									color: '#032c28',
									opacity: 1,
								},
							},
						}}
					/>
				)}
			/>
		</Box>
	);
}
