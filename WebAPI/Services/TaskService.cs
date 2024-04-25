using System.Collections.Generic;
using ModelsTask = WebAPI.Models.Task;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Services;
namespace WebAPI.Services
{
    public class TaskService
    {
        private readonly List<ModelsTask> _tasks = new List<ModelsTask>();
        private int _nextId = 1;

        public List<ModelsTask> GetTasks()
        {
            return _tasks;
        }

        public ModelsTask CreateTask(ModelsTask task)
        {
            task.Id = _nextId++;
            _tasks.Add(task);
            return task;
        }
    }
}
