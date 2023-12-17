import "./index.css";
import Column from "../../component/column";

interface ChildProps {
	className?: string;
	style?: React.CSSProperties;	
	type?: any;
	label?: string;
	message?: string;
	placeholder?: string;
	value?: any;
	onInput?: any;
}

export default function Component({
	className, 
	style, 
	type,
	label, 
	message, 
	placeholder,
	value,
	onInput
}:ChildProps):React.ReactElement {

	
	return (
		<>
			<Column className="column--8">
				<label className="label">{label}</label>
				<div className="input-container">
					<input
						onInput={onInput}
						className={`input ${className}`}
						name={label}
						type={type}
						style={{...style}}
						placeholder={placeholder}
						value={value}
					/>
				</div>
				<div className="message">{message}</div>
			</Column>
		</>
	)
}