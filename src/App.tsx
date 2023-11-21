import ProjectContainer from "./ProjectContainer.tsx";
import {useAppDispatch, useAppSelector} from "./hooks.ts";
import {useEffect} from "react";
import {initializeState} from "./redux/projectsSlice.ts";

function App() {
  const projects = useAppSelector(s => s.projects.projects);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeState())
  }, []);

  return (
    <>
      <div className='container mx-auto p-4 bg-neutral-800 h-screen'>
        <div className="grid grid-cols-3 gap-4 h-full">
          <ProjectContainer idx={0} projects={projects[0]}/>
          <ProjectContainer idx={1} projects={projects[1]}/>
          <ProjectContainer idx={2} projects={projects[2]}/>
        </div>
      </div>
    </>
  )
}

export default App
