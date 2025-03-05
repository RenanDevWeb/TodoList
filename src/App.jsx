import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import TaskInput from "./components/TaskInputs";
import TaskList from "./components/TaskList";

const MySwal = withReactContent(Swal)



const App = () => {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  useEffect(() => {
    // Este efeito salva as tarefas no localStorage sempre que o estado 'tasks' muda
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, { id: Date.now(), text: task, done: false }]);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const deleteTask = (taskId) => {
    Swal.fire({
      title: "Deseja realmente excluir ? ",
      showDenyButton: true,
      confirmButtonText: "Salvar",
      denyButtonText: `Voltar`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Deletado", "", "success");
        setTasks(tasks.filter((task) => task.id !== taskId));
      } else if (result.isDenied) {
        Swal.fire("O item não foi deletado", "", "info");
      }
    });




    
  };

  const toggleTaskDone = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, done: !task.done } : task
      )
    );
  };

  return (
    <div>
      <h1>Lista de Tarefas</h1>
      <hr />
      <TaskInput onAddTask={addTask} />
      <TaskList
        tasks={tasks}
        onDeleteTask={deleteTask}
        onToggleTaskDone={toggleTaskDone}
      />
    </div>
  );
};

export default App;