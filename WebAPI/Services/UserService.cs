using System.Collections.Generic;
using System.Linq;
using WebAPI.Models;

namespace WebAPI.Services
{
    public class UserService
    {
        private readonly List<User> _users = new List<User>();
        private int _nextId = 1;

        public List<User> GetUsers()
        {
            return _users;
        }

        public User CreateUser(User user)
        {
            user.Id = _nextId++;
            _users.Add(user);
            return user;
        }
    }
}
