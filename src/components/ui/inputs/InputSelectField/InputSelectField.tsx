import { FC, memo } from 'react';

import { Autocomplete, AutocompleteRenderInputParams, Box, TextField } from '@mui/material';
import clsx from 'clsx';

import styles from '../Input.module.css';

type Option = {
	label: string;
	value: string;
};

interface InputSelectFieldProps {
	label?: string;
	placeholder?: string;
	options: Option[];
	value?: Option | null;
	name: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
	errorText?: string;
	disabled?: boolean;
	className?: string;
}

const InputSelectField: FC<InputSelectFieldProps> = ({
	label,
	options,
	value,
	name,
	onChange,
	onBlur,
	placeholder,
	errorText,
	disabled,
	className,
}) => {
	const handleChange = (_: React.SyntheticEvent, newValue: Option | null) => {
		const event = {
			target: {
				name,
				value: newValue?.value ?? '',
			},
		} as React.ChangeEvent<HTMLInputElement>;
		onChange(event);
	};

	return (
		<div className={clsx(styles['input-text-field'], className)}>
			{label && (
				<label className={styles.label} htmlFor={name}>
					{label}
				</label>
			)}
			<Autocomplete
				options={options}
				value={value || null}
				onChange={handleChange}
				getOptionLabel={(option) => option.label}
				isOptionEqualToValue={(a, b) => a.value === b.value}
				disabled={disabled}
				noOptionsText="Ничего не найдено"
				renderInput={(params: AutocompleteRenderInputParams) => (
					<TextField
						{...params}
						className={styles.input}
						name={name}
						placeholder={placeholder}
						onBlur={onBlur}
						error={!!errorText}
						InputProps={{
							...params.InputProps,
							sx: {
								paddingRight: '10px',
								borderRadius: '16px',
								backgroundColor: '#fff',
								color: '#032c28',
								'& input::placeholder': {
									color: '#888888',
									opacity: 1,
								},
							},
						}}
						sx={{
							'& .MuiOutlinedInput-root': {
								fontFamily: 'var(--font-buttons)',
								paddingLeft: '20px',
								height: '48px',
								'& fieldset': {
									borderColor: '#ccc',
								},
								'&:hover fieldset': {
									borderColor: 'var(--label-color)',
								},
								'&.Mui-focused fieldset': {
									borderColor: '#032c28',
								},
							},
						}}
					/>
				)}
				renderOption={(props, option) => (
					<Box
						component="li"
						{...props}
						key={'key' + option.label}
						sx={{
							px: 2,
							py: 1,
							cursor: 'pointer',
							color: '#032c28',
							'&:hover': {
								backgroundColor: '#032c28',
								color: '#8FE248',
							},
							'&.Mui-focused': {
								backgroundColor: '#032c28',
								color: '#8FE248',
							},
						}}
					>
						{option.label}
					</Box>
				)}
			/>
			{errorText && <span className={styles['error-text']}>{errorText}</span>}
		</div>
	);
};

export default memo(InputSelectField);
