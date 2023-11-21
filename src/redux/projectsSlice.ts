import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface IProject {
	id: string;
	title: string;
	task: string;
	duration: number;
	parentId: number;
}

interface ProjectsSliceState {
	projects: [IProject[],IProject[],IProject[]];
}

const initialState: ProjectsSliceState = {
	projects: [[],[],[]]
}

export const projectsSlice = createSlice({
	name: 'projects',
	initialState,
	reducers: {
		initializeState: (state) => {
			state.projects[0] = [
				{
					title: 'Project X',
					task: 'Task 1',
					id: crypto.randomUUID(),
					duration: 120,
					parentId: 0
				},
			];
			state.projects[1] = [
				{
					title: 'Project Y',
					task: 'Task 2',
					id: crypto.randomUUID(),
					duration: 60,
					parentId: 1
				},
				{
					title: 'Project Y',
					task: 'Task 3',
					id: crypto.randomUUID(),
					duration: 30,
					parentId: 1
				},
			]
		},
		moveProjectToContainer: (state, {payload}: PayloadAction<{id: string, idxTo: number, idxFrom: number}>) => {
			const project = state.projects[payload.idxFrom].find(x => x.id === payload.id);
			if(project) {
				if(!state.projects[payload.idxTo].some(x => x.id === payload.id)) {
					project.parentId = payload.idxTo;
					state.projects[payload.idxTo].push(project);
					state.projects[payload.idxFrom] = state.projects[payload.idxFrom].filter(x => x.id !== payload.id);
				}
			}
		}
	}
});

export const {initializeState,moveProjectToContainer} = projectsSlice.actions;

export default projectsSlice.reducer;