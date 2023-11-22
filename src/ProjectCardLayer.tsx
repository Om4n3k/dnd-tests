import {FC} from 'react';
import {useDragLayer, XYCoord} from "react-dnd";
import {IProject} from "./redux/projectsSlice.ts";
import * as classNames from "classnames";

const ProjectCardLayer: FC = () => {
	const {isDragging, currentOffset, item} = useDragLayer<{
		isDragging: boolean,
		currentOffset: XYCoord|null,
		item: IProject
	},IProject>(
		(monitor) => {
			return {
				isDragging: monitor.isDragging(),
				currentOffset: monitor.getSourceClientOffset(),
				item: monitor.getItem()
			};
		}
	);

	const cardClasses = classNames('w-[400px] bg-blue-800/20 m-2 rounded-lg p-4 wiggle');

	if(!isDragging || !currentOffset) return null;

	return (
		<div className={cardClasses} style={{
			//transform: `translate(${currentOffset.x}px, ${currentOffset.y}px)`,
			position: 'fixed',
			top: `${currentOffset.y}px`,
			left: `${currentOffset.x}px`,
			pointerEvents: 'none',
		}}>
			<h1 className='text-2xl'>{item.title}</h1>
			<h3 className='text-lg mb-2'>{item.task}</h3>
			<span className='text-xl'>{item.duration} min</span>
		</div>
	);
}

export default ProjectCardLayer;