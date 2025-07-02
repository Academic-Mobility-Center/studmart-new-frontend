import React from 'react';

export interface IFaqItem extends React.HTMLAttributes<HTMLDivElement> {
	heading: string;
	isOpen?: boolean;
}
