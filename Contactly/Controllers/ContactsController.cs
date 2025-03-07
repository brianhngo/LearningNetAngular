using Contactly.Data;
using Contactly.Models;
using Contactly.Models.Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Text;



namespace Contactly.Controllers{
  [Route("api/[controller]")]
  [ApiController]

  public class ContactsController : ControllerBase{

    private readonly ContactlyDbContext dbContext;
    
    public ContactsController(ContactlyDbContext dbContext){
      this.dbContext = dbContext;
    }


    [HttpGet]
    public IActionResult GetAllContacts(){
    
      var contacts = dbContext.Contacts.ToList();
      return Ok(contacts);

    }

    [HttpPost]
    public IActionResult AddContact(AddRequestDTO request){
      Console.WriteLine(request);
      var newContact = new Contact{
        Id = Guid.NewGuid(),
        Name = request.Name,
        Email = request.Email,
        Phone = request.Phone,
        Favorite = true
      };

      dbContext.Contacts.Add(newContact);
      dbContext.SaveChanges();

      return Ok(newContact);
    }

    
  }
}