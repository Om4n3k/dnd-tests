import {FC} from 'react';
import {useDrag} from "react-dnd";
import * as classNames from "classnames";
import {IProject} from "./redux/projectsSlice.ts";

interface Props {
	id: string;
	title: string;
	task: string;
	duration: number;
	parentId: number
}

const ProjectCard: FC<Props> = (props) => {

	const [{isDragging}, dragRef] = useDrag<IProject,unknown,{isDragging:boolean}>({
		type: 'entry',
		item: {
			id: props.id,
			title: props.title,
			task: props.task,
			duration: props.duration,
			parentId: props.parentId
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging()
		})
	})

	const cardClasses = classNames('bg-blue-800/20 m-2 rounded-lg p-4',{
		'animate-pulse': isDragging
	});

	return (
		<div ref={dragRef} className={cardClasses}>
			<h1 className='text-2xl'>{props.title}</h1>
			<h3 className='text-lg mb-2'>{props.task}</h3>
			<span className='text-xl'>{props.duration} min</span>

			{isDragging && '❤️'}
		</div>
	);
}

export default ProjectCard;