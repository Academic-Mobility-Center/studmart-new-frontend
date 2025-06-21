import { FC, memo, useEffect, useRef, useState } from 'react';

import clsx from 'clsx';

import styles from '../Input.module.css';
import multiSelectStyles from './InputMultiSelect.module.css';

export interface Option {
	value: string;
	label: string;
}

export interface MultiSelectProps {
	name: string;
	options: Option[];
	selectedValues?: string[];
	onChange?: (name: string, selectedValues: string[]) => void;
	label?: string;
	errorText?: string;
	placeholder?: string;
	className?: string;
	disabled?: boolean;
}

const InputMultiSelect: FC<MultiSelectProps> = ({
	name,
	options,
	selectedValues = [],
	onChange,
	label,
	errorText,
	placeholder = 'Выбери...',
	className,
	disabled = false,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selected, setSelected] = useState<string[]>(selectedValues);
	const containerRef = useRef<HTMLDivElement>(null);
	const currentId = name + 'Id';

	const toggleDropdown = () => {
		if (!disabled) {
			setIsOpen(!isOpen);
		}
	};

	const handleOptionClick = (value: string) => {
		const newSelected = selected.includes(value)
			? selected.filter((item) => item !== value)
			: [...selected, value];

		setSelected(newSelected);
		onChange?.(name, newSelected);
	};

	const getSelectedLabels = () => {
		return selected
			.map((value) => options.find((option) => option.value === value)?.label)
			.filter(Boolean)
			.join(', ');
	};

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	// Update selected values when prop changes
	useEffect(() => {
		setSelected(selectedValues);
	}, [selectedValues]);

	return (
		<div className={clsx(styles['input-text-field'], className)}>
			{label && (
				<label className={styles.label} htmlFor={currentId}>
					{label}
				</label>
			)}
			<div ref={containerRef} className={multiSelectStyles.container}>
				<div
					className={clsx(styles.input, multiSelectStyles['select-field'], {
						[styles.error]: !!errorText,
						[multiSelectStyles.disabled]: disabled,
					})}
					onClick={toggleDropdown}
					id={currentId}
				>
					<div className={multiSelectStyles['selected-text']}>
						{selected.length > 0 ? getSelectedLabels() : placeholder}
					</div>
					<div className={multiSelectStyles.arrow}>
						<span className={clsx({ [multiSelectStyles.rotated]: isOpen })}>▼</span>
						{/* <svg
							width="10"
							height="6"
							viewBox="0 0 10 6"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							className={clsx({ [multiSelectStyles.rotated]: isOpen })}
						>
							<path
								d="M1 1L5 5L9 1"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg> */}
					</div>
				</div>

				{isOpen && (
					<div className={multiSelectStyles.dropdown}>
						{options.map((option) => (
							<div
								key={option.value}
								className={clsx(multiSelectStyles.option, {
									[multiSelectStyles.selected]: selected.includes(option.value),
								})}
								onClick={() => handleOptionClick(option.value)}
							>
								<div className={multiSelectStyles.checkbox}>
									{selected.includes(option.value) && (
										<svg
											width="10"
											height="8"
											viewBox="0 0 10 8"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M1 4L3.5 6.5L9 1"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									)}
								</div>
								{option.label}
							</div>
						))}
					</div>
				)}
			</div>
			{errorText && <span className={styles['error-text']}>{errorText}</span>}
		</div>
	);
};

export default memo(InputMultiSelect);
