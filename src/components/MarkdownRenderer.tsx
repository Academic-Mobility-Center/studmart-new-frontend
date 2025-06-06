import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type MarkdownRendererProps = {
	content?: string;
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
	if (!content) return null;

	const prepareContent = (text: string) =>
		text
			.replace(/\r\n/g, '\n')
			.replace(/\n/g, '  \n')
			.replace(/(\d+)\sруб\./g, '$1\u00A0руб.');

	const fixedContent = prepareContent(content);

	return (
		<ReactMarkdown
			remarkPlugins={[remarkGfm]}
			components={{
				h1: ({ children }) => <h1 className="text-[32px] font-bold mt-4">{children}</h1>,
				h2: ({ children }) => <h2 className="text-[24px] font-semibold mt-4">{children}</h2>,
				h3: ({ children }) => <h3 className="text-[18px] font-semibold mt-4">{children}</h3>,
				h4: ({ children }) => <h4 className="text-[16px] font-semibold mt-4">{children}</h4>,
				h5: ({ children }) => <h5 className="text-[14px] font-semibold mt-4">{children}</h5>,
				p: ({ children }) => <p className="my-2">{children}</p>,
				ol: ({ children }) => <ol className="list-decimal pl-6 my-2">{children}</ol>,
				ul: ({ children }) => <ul className="list-disc pl-6 my-2">{children}</ul>,
				li: ({ children }) => <li className="my-1">{children}</li>,
			}}
		>
			{fixedContent}
		</ReactMarkdown>
	);
};

export default MarkdownRenderer;
