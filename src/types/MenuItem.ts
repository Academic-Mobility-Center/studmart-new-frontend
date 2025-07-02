export default interface MenuItem {
	name: string;
	Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
	id?: number;
	IconUrl?: string;
}
