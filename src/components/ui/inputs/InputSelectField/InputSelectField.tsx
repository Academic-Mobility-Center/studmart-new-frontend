import {
	ChangeEvent,
	FC,
	InputHTMLAttributes,
	KeyboardEvent,
	TextareaHTMLAttributes,
	useEffect,
	useRef,
	useState,
} from 'react';

import clsx from 'clsx';

import InputTextField from '@/components/ui/inputs/InputTextField';

import { Option } from '@/types/Option';

import ArrowDown from '@/assets/icons/arrows/input_arrow.svg';

import styles from './InputSelectField.module.css';

interface IInputSelectFieldProps
	extends Omit<
		InputHTMLAttributes<HTMLInputElement> & TextareaHTMLAttributes<HTMLTextAreaElement>,
		'onChange' | 'value'
	> {
	name: string;
	label?: string;
	options?: Option[];
	loadOptions?: (input: string) => Promise<Option[]>;
	onChange: (name: string, values: Option | null) => void;
	value?: Option;
	errorText?: string;
	isTextArea?: boolean;
	textAreaResize?: boolean;
	searchOn?: boolean;
}

const InputSelectField: FC<IInputSelectFieldProps> = ({
	name,
	label,
	options = [],
	loadOptions,
	onChange,
	value,
	errorText,
	placeholder,
	disabled,
	isTextArea = false,
	textAreaResize = true,
	searchOn = true,
	...rest
}) => {
	const [suggestions, setSuggestions] = useState<Option[]>(options);
	const [isOpen, setIsOpen] = useState(false);
	const [inputValue, setInputValue] = useState(value?.label ?? '');
	const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setInputValue(value?.label ?? '');
	}, [value]);

	useEffect(() => {
		const input = inputValue.trim();
		if (!input) {
			setSuggestions(options);
			return;
		}
		if (searchOn)
			if (loadOptions) {
				loadOptions(input).then((res) => {
					setSuggestions(res);
					setHighlightedIndex(-1);
				});
			} else {
				const filtered = options.filter((opt) =>
					opt.label.toLowerCase().includes(input.toLowerCase()),
				);
				setSuggestions(filtered);
				setHighlightedIndex(-1);
			}
	}, [inputValue, loadOptions, options, searchOn]);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setInputValue(e.target.value);
		setIsOpen(true);
		if (!e.target.value) {
			setHighlightedIndex(-1);
			onChange(name, null);
		}
	};

	const handleClear = () => {
		setInputValue('');
		setIsOpen(false);
		setHighlightedIndex(-1);
		onChange(name, null);
	};

	const handleSelect = (option: Option, index: number) => {
		onChange(name, option);
		setInputValue(option.label);
		setIsOpen(false);
		setHighlightedIndex(index);
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		if (!isOpen) return;

		if (e.key === 'ArrowDown') {
			e.preventDefault();
			setHighlightedIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
		}
		if (e.key === 'ArrowUp') {
			e.preventDefault();
			setHighlightedIndex((prev) => Math.max(prev - 1, 0));
		}
		if (e.key === 'Enter') {
			e.preventDefault();
			if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
				handleSelect(suggestions[highlightedIndex], highlightedIndex);
			}
		}
		if (e.key === 'Escape') {
			e.preventDefault();
			setIsOpen(false);
		}
	};

	return (
		<div className={styles['autocomplete']} ref={containerRef}>
			<div className={styles['input-wrapper']}>
				<InputTextField
					inputClassName={clsx(styles['input-with-arrow'], { [styles.pointer]: !searchOn })}
					clearButtonClass={styles['clear-button-select']}
					onClick={() => setIsOpen(true)}
					name={name}
					label={label}
					value={inputValue}
					placeholder={placeholder}
					errorText={errorText}
					disabled={disabled}
					autoComplete="off"
					onChange={handleInputChange}
					onClear={handleClear}
					onKeyDown={handleKeyDown}
					isTextArea={isTextArea}
					textAreaResize={textAreaResize}
					readOnly={!searchOn}
					{...rest}
				/>
				<span
					onClick={() => setIsOpen((prev) => !prev)}
					aria-hidden="true"
					className={clsx(styles['icon'], {
						[styles['has-error']]: !!errorText,
						[styles['icon-open']]: isOpen,
					})}
				>
					<ArrowDown />
				</span>
			</div>
			{isOpen && suggestions.length > 0 && (
				<ul className={styles['dropdown']}>
					{suggestions.map((opt, index) => (
						<li
							key={opt.value}
							className={`${styles['dropdown-item']} ${
								index === highlightedIndex ? styles['highlighted'] : ''
							}`}
							onClick={() => handleSelect(opt, index)}
						>
							{opt.label}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default InputSelectField;
