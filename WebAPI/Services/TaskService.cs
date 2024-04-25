using System.Collections.Generic;
using System.Linq;
using WebAPI.Models;

namespace WebAPI.Services
{
    public class TaskService
    {
        private readonly List<Models.Task> _tasks = new List<Models.Task>(); // Use o alias Models.Task
        private int _nextId = 1;

        public List<Models.Task> GetTasks() // Use o alias Models.Task
        {
            return _tasks;
        }

        public Models.Task CreateTask(Models.Task task) // Use o alias Models.Task
        {
            task.Id = _nextId++;
            _tasks.Add(task);
            return task;
        }

        // Outros métodos CRUD (UpdateTask, DeleteTask) podem ser implementados aqui
    }
}
