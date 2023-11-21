import {FC} from 'react';
import {IProject, moveProjectToContainer} from "./redux/projectsSlice.ts";
import ProjectCard from "./ProjectCard.tsx";
import {useDrop} from "react-dnd";
import {useAppDispatch} from "./hooks.ts";

interface Props {
	projects: IProject[]
	idx: number
}

const ProjectContainer: FC<Props> = (props) => {
	const dispatch = useAppDispatch();

	const [{isOver},dropRef] = useDrop<IProject,unknown,{
		isOver: boolean
	}>({
		accept: 'entry',
		drop: (item) => {
			dispatch(moveProjectToContainer({
				idxTo: props.idx,
				idxFrom: item.parentId,
				id: item.id
			}));
		},
		collect: monitor => ({
			isOver: monitor.isOver() && monitor.getItem().parentId !== props.idx
		})
	})

	return (
		<div ref={dropRef} className='bg-neutral-700/20 border rounded-lg border-neutral-700 h-full'>
			{props.projects.map(x => <ProjectCard title={x.title} parentId={x.parentId} task={x.task} duration={x.duration} id={x.id} key={x.id}/>)}
			{isOver && (
				<div className='m-2 p-4 bg-red-700/20'>
					<h3>Drop here</h3>
				</div>
			)}
		</div>
	);
}

export default ProjectContainer;