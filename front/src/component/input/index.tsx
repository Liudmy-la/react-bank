import "./index.css";
import Column from "../../component/column";

interface ChildProps {
	className?: string;
	style?: React.CSSProperties;	
	type?: string;
	label?: string;
	message?: string;
	placeholder?: string;
	value?: string | number;
	onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	showPassword?: boolean;
	onPassVisibility?: () => void;
}

export default function Component({
	className, 
	style, 
	type = "text",
	label, 
	message, 
	placeholder,
	value,
	onInput,	
	showPassword = false,
	onPassVisibility,
}:ChildProps):React.ReactElement {

	const inputType = type === "password" && !showPassword ? "password" : "text";

	return (
		<>
			<Column className="column--8">
				<label className="label">{label}</label>
				<div className="input-container">
					<input
						onInput={onInput}
						className="input"
						style={{...style}}
						name={label}
						type={type === "number" ? "number" : inputType}
						placeholder={placeholder}
						value={value}
					/>
					{type === "password" && (
						<span
							className={showPassword ? "appear" : "disappear"}
							onClick={onPassVisibility}
						></span>
					)}
				</div>
				{message && <div className="message">{message}</div>}
			</Column>
		</>
	)
}