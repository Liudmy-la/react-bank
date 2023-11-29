import "./index.css";

export function Loader() {
	return <div className="loader"></div>
}

export function Skeleton() {
	return (
		<div className="skeleton">
			<div className="skeleton__item"></div>
			<div className="skeleton__item"></div>
		</div>
	)
}