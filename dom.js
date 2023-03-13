function savetoLocalStorage(event) {
    event.preventDefault();
    const name = event.target.username.value;
    const phone = event.target.contact.value;
    const email = event.target.email.value;
  
    const obj = {
      name: name,
      phone: phone,
      email: email,
    };
  
    axios
      .post(
        "https://crudcrud.com/api/7373238e4c064984b81b5db60d201e73/appointmentdata",
        obj
      )
      .then((response) => {
        console.log(response);
        showuseronScreen(obj, response.data._id);
      })
      .catch((err) => {
        document.body.innerHTML =
          document.body.innerHTML + "<h4> Something went wrong </h4>";
        console.log(err);
      });
  
    event.target.reset();
  }
  
  function showuseronScreen(obj, id) {
    const parentElem = document.getElementById("listofitems");
    const childElem = document.createElement("li");
    childElem.textContent = obj.name + " - " + obj.phone + " - " + obj.email;
  
    // Adding delete icon and functionality
    const delIcon = document.createElement("i");
    delIcon.className = "fa fa-trash-o";
    delIcon.style.cursor = "pointer";
    delIcon.onclick = () => {
      axios
        .delete(
          `https://crudcrud.com/api/7373238e4c064984b81b5db60d201e73/appointmentdata/${id}`
        )
        .then((response) => {
          console.log(response);
          parentElem.removeChild(childElem);
        })
        .catch((err) => {
          console.log(err);
        });
    };
  
    childElem.appendChild(delIcon);
    parentElem.appendChild(childElem);
  
    // Adding edit icon and functionality
    const editIcon = document.createElement("i");
    editIcon.className = "fa fa-pencil";
    editIcon.style.cursor = "pointer";
    editIcon.onclick = () => {
      document.getElementById("username").value = obj.name;
      document.getElementById("email").value = obj.email;
      document.getElementById("contact").value = obj.phone;
    };
  
    childElem.appendChild(editIcon);
  }
  
  window.addEventListener("DOMContentLoaded", () => {
    axios
      .get(
        "https://crudcrud.com/api/7373238e4c064984b81b5db60d201e73/appointmentdata"
      )
      .then((response) => {
        console.log(response);
        for (var i = 0; i < response.data.length; i++) {
          showuseronScreen(response.data[i], response.data[i]._id);
        }
      })
      .catch((err) => {
        document.body.innerHTML =
          document.body.innerHTML + "<h4> Something went wrong </h4>";
        console.log(err);
      });
  });
  