import "./App.css";
import { useEffect } from "react";

function App() {
  useEffect(() => {

    const $ = window.$;

    $("#view_btn").click(function () {
      alert("Games Loaded");

      const xhr = new XMLHttpRequest();
      xhr.open("GET", "https://68dde703d7b591b4b78dd59c.mockapi.io/games");
      xhr.setRequestHeader("content-type", "application/json");
      xhr.send();
      xhr.onload = () => {
        if (xhr.status === 200) {
          let res = JSON.parse(xhr.response);
          $("#div_list").html("");
          res.forEach(function (each) {
            $("#game_list").append(`<div id="list_block"> id of game : ${each.id} <br> username : ${each.username}
              <br> game name : ${each.game_name} <br> rating : ${each.rating} <br> description : ${each.description} </div> <br> `);
          });
        } else {
          console.log(xhr.status, xhr.statusText);
        }
      }
    });

    $("#add_confirm_btn").click(function () {
      alert("Game added");

      const xhr = new XMLHttpRequest();
      xhr.open("POST", "https://68dde703d7b591b4b78dd59c.mockapi.io/games");
      xhr.setRequestHeader("content-type", "application/json");
      let data = { username: $("#add_username_input").val(), game_name: $("#add_gamename_input").val(), rating: $("#add_rating_input").val(), description: $("#add_description_input").val() };
      xhr.send(JSON.stringify(data));
      xhr.onload = () => {
        if (xhr.status === 200) {
          let res = JSON.parse(xhr.response);
          alert(JSON.stringify(res));
        } else {
          console.log(xhr.status, xhr.statusText);
        }
      }
    });

    $("#del_confirm_btn").click(function () {
      const xhr = new XMLHttpRequest();

      xhr.open("DELETE", "https://68dde703d7b591b4b78dd59c.mockapi.io/games/" + $("#del_id_input").val());
      xhr.setRequestHeader("content-type", "application/json");
      xhr.send();

      xhr.onload = () => {
        if (xhr.status === 200) {
          let res = JSON.parse(xhr.responseText);
          const name = res.game_name;
          alert("Game \"" + name + "\" deleted");
        } else {
          alert("Failed");
        }
      }
    });

    $("#edit_confirm_btn").click(function () {
      const xhr = new XMLHttpRequest();
      xhr.open("PUT", "https://68dde703d7b591b4b78dd59c.mockapi.io/games/" + $("#edit_id_input").val());
      xhr.setRequestHeader("content-type", "application/json");
      let data = { id: $("#edit_id_input").val(), username: $("#edit_username_input").val(), game_name: $("#edit_gamename_input").val(), rating: $("#edit_rating_input").val(), description: $("#edit_description_input").val() };
      xhr.send(JSON.stringify(data));
      xhr.onload = () => {
        if (xhr.status === 200) {
          let res = JSON.parse(xhr.response);
          alert("Edited");
        } else {
          alert("Failed");
        }
      }
    });
  }, []);

  return (
    <div className="App">
      <div className="container">
        <h1>AJAX Practice CRUD SITE</h1>

        <button id="view_btn" className="btn btn-primary">View List</button> <br />
        <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#addModal">Add Game</button>
        <button className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#editModal">Edit Game</button>
        <button className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal">Delete Game</button> <br />
        <br /><br />

        <div id="game_list"></div>

        <div className="modal fade" id="addModal" tabIndex="-1" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5">Add Game</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="add_username_input" className="form-label">username</label>
                  <input type="text" className="form-control" id="add_username_input" />
                </div>

                <div className="mb-3">
                  <label htmlFor="add_gamename_input" className="form-label">gamename</label>
                  <input type="text" className="form-control" id="add_gamename_input" />
                </div>

                <div className="mb-3">
                  <label htmlFor="add_rating_input" className="form-label">rating</label>
                  <input type="number" className="form-control" id="add_rating_input" />
                </div>

                <div className="mb-3">
                  <label htmlFor="add_description_input" className="form-label">description</label>
                  <input type="text" className="form-control" id="add_description_input" />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-primary" id="add_confirm_btn">Add</button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade" id="editModal" tabIndex="-1" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5">Edit Game</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="edit_id_input" className="form-label">id</label>
                  <input type="text" className="form-control" id="edit_id_input" />
                </div>

                <div className="mb-3">
                  <label htmlFor="edit_username_input" className="form-label">username</label>
                  <input type="text" className="form-control" id="edit_username_input" />
                </div>

                <div className="mb-3">
                  <label htmlFor="edit_gamename_input" className="form-label">gamename</label>
                  <input type="text" className="form-control" id="edit_gamename_input" />
                </div>

                <div className="mb-3">
                  <label htmlFor="edit_rating_input" className="form-label">rating</label>
                  <input type="number" className="form-control" id="edit_rating_input" />
                </div>

                <div className="mb-3">
                  <label htmlFor="edit_description_input" className="form-label">description</label>
                  <input type="text" className="form-control" id="edit_description_input" />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-primary" id="edit_confirm_btn">Edit</button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade" id="deleteModal" tabIndex="-1" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5">Delete Game</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="del_id_input" className="form-label">id</label>
                  <input type="text" className="form-control" id="del_id_input" />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-danger" id="del_confirm_btn">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
