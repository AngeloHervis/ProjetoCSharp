using System.Collections.Generic;
using System.Linq;
using WebAPI.Models;

namespace WebAPI.Services
{
    public class TaskService
    {
        private readonly List<Task> _tasks = new List<Task>();
        private int _nextId = 1;

        public List<Task> GetTasks()
        {
            return _tasks;
        }

        public Task CreateTask(Task task)
        {
            task.Id = _nextId++;
            _tasks.Add(task);
            return task;
        }
    }
}
