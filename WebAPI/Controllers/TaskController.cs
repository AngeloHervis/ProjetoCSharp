using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using ModelsTask = WebAPI.Models.Task; // Alias para WebAPI.Models.Task
using System.Threading.Tasks; // Importe o namespace System.Threading.Tasks

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaskController : ControllerBase
    {
        private readonly TaskService _taskService;

        public TaskController(TaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpGet]
        public ActionResult<List<ModelsTask>> GetTasks()
        {
            var tasks = _taskService.GetTasks();
            return Ok(tasks);
        }

        [HttpPost]
        public ActionResult<ModelsTask> CreateTask([FromBody] ModelsTask task)
        {
            var newTask = _taskService.CreateTask(task);
            return Ok(newTask);
        }

        // Outros métodos CRUD (UpdateTask, DeleteTask) podem ser implementados aqui
    }
}
