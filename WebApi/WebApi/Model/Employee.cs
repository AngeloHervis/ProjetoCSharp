using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.Model
{
    [Table("employee")]
    public class Employee
    {

        [Key]
        public int id { get; private set; }
        public int name { get; private set; }
        public int age { get; private set; }
        public int photo { get; private set; }
    }
}
