import React from 'react'
import {Form , Formik} from 'formik'
import {useParams , useNavigate} from 'react-router-dom'
import {useTasks} from "../context/TaskContext";
import {useEffect , useState} from "react"


 function TaskForm() {
  
  const{createTask , getTask , updateTask} = useTasks()
 
  const [task , setTask] = useState({
    title: "",
    description: "",
  });
  const params = useParams()
  const navigate = useNavigate()

  useEffect(()=>{
   const loadTask = async ()=> {
    if(params.id){
      const task = await getTask(params.id);
      setTask({
        title: task.title,
        description: task.description,
      })
   }
    }
  })

  return (
    <div>
      <h1 className="text-xl font-bold uppercase text-center">{ params.id ? "Edit Task" : "New Task"}
      </h1>
      <Formik
      initialValues={task}
      enableReinitialize={true}
      onSubmit={async (values , actions)=>{
        console.log(values);
        if(params.id){
          await updateTask(params.id , values)
          
        }else{
      await createTask(values)
        }
        navigate("/");
       setTask({
        title: "",
        description:""
       })
      }}
      >
        {({handleChange , handleSubmit , values , isSubmitting})=>(
          <Form onSubmit={handleSubmit} className="bg-slate-300 max-w-sm p-4 mx-auto py10">
          <label className="block">title</label>
          <input className="px-2 py-1 rounded-sm w-full"
          type="text" 
          name="title" 
          placeholder="Write a title"
          onChange={handleChange}
           value ={ values.title}
           />
          <label className="block"> description</label>
          <textarea
          className="px-2 py-1 rounded-sm w-full"
          name="description"
          rows="3"
          placeholder="Write description"
          onChange={handleChange} 
          value={values.description}
          ></textarea>
          <button type="Submit" disabled={isSubmitting} className="w-full
          block bg-indigo-500 px-2 py-1 text-white">
           {isSubmitting ? "Saving...": "Save"}
            </button>
          </Form>
  
        )}
        
      </Formik>

      </div>

  )
}
export default TaskForm