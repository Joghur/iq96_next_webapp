import type { FC } from "react";
import { Button } from "./ui/button";

interface Props {
	acceptCookies: () => void;
}

const CookieWarning: FC<Props> = ({ acceptCookies }) => {
	return (
		<div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-primary bg-opacity-50">
			<div className="dynamic_text max-w-sm rounded-lg bg-secondary p-6 text-center shadow-md">
				<div className="mb-4 flex justify-center gap-2">
					<p>Ved at bruge siden accepterer du brugen af cookies!</p>
				</div>
				<Button className="dynamic_text border" onClick={acceptCookies}>
					Acceptér
				</Button>
			</div>
		</div>
	);
};

export default CookieWarning;
