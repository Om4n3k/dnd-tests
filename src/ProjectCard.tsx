import {FC, useEffect} from 'react';
import {useDrag, XYCoord} from "react-dnd";
import * as classNames from "classnames";
import {IProject} from "./redux/projectsSlice.ts";
import ProjectCardLayer from "./ProjectCardLayer.tsx";
import {getEmptyImage} from "react-dnd-html5-backend";

interface Props {
	id: string;
	title: string;
	task: string;
	duration: number;
	parentId: number;
	className?: string;
}

const ProjectCard: FC<Props> = (props) => {

	const [{isDragging,cords}, dragRef,dragPreview] = useDrag<IProject,unknown,{isDragging:boolean,cords:XYCoord|null}>({
		type: 'entry',
		item: {
			id: props.id,
			title: props.title,
			task: props.task,
			duration: props.duration,
			parentId: props.parentId
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
			cords: monitor.getClientOffset()
		})
	})

	useEffect(() => {
		dragPreview(getEmptyImage())
	}, []);

	const cardClasses = classNames('bg-blue-800/20 m-2 rounded-lg p-4');

	useEffect(() => {
		console.log(cords)
	}, [cords]);

	return (
			<div ref={dragRef} style={{visibility: isDragging ? 'hidden' : 'inherit'}}>
				<div className={cardClasses} ref={dragRef}>
					<h1 className='text-2xl'>{props.title}</h1>
					<h3 className='text-lg mb-2'>{props.task}</h3>
					<span className='text-xl'>{props.duration} min</span>
				</div>
				<ProjectCardLayer/>
			</div>
	);
}

export default ProjectCard;