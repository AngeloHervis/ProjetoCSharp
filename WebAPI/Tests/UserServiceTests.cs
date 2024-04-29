using System.Collections.Generic;
using Xunit;
using WebAPI.Models;
using WebAPI.Services;

namespace WebAPI.Tests
{
    public class UserServiceTests
    {
        // Método de teste para o método GetUsers do UserService
        [Fact]
        public void GetUsers_ReturnsListOfUsers()
        {
            // Arrange (preparação): Criar instância do UserService e definir os dados de teste
            var userService = new UserService();
            var expectedUsers = new List<User>
            {
                new User { Id = 1, Name = "John", Email = "john@example.com" },
                new User { Id = 2, Name = "Alice", Email = "alice@example.com" }
            };

            // Act (ação): Chamar o método GetUsers
            var actualUsers = userService.GetUsers();

            // Assert (verificação): Comparar os usuários retornados com os usuários esperados
            Assert.Equal(expectedUsers, actualUsers);
        }

        // Método de teste para o método CreateUser do UserService
        [Fact]
        public void CreateUser_ReturnsNewUser()
        {
            // Arrange (preparação): Criar instância do UserService e definir os dados de teste
            var userService = new UserService();
            var newUser = new User { Id = 3, Name = "Bob", Email = "bob@example.com" };

            // Act (ação): Chamar o método CreateUser
            var actualUser = userService.CreateUser(newUser);

            // Assert (verificação): Verificar se o usuário retornado é o mesmo que foi criado
            Assert.Equal(newUser, actualUser);
        }
    }
}
