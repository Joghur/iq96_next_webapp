import React, { useState } from "react";

type Props = { text: string };

export function CopyButton({ text }: Props) {
	const [textToCopy] = useState(text || "");
	const [isCopied, setIsCopied] = useState(false);

	const copyToClipboard = () => {
		navigator.clipboard
			.writeText(textToCopy)
			.then(() => setIsCopied(true))
			.catch((err) => {
				console.error("Failed to copy to clipboard:", err);
			});
	};

	return (
		<div>
			<Button onClick={copyToClipboard}>{isCopied ? "Copied!" : text}</Button>
		</div>
	);
}
