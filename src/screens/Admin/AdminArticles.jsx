import React from "react";
import "./AdminMembers.css";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import Axios from "axios";
import { API_URL } from "../../constants/API";
import swal from "sweetalert";
import { Button } from "reactstrap";
import TextField from "../../components/TextField/TextField";

class AdminArticles extends React.Component {
  state = {
    articleList: [],
    createForm: {
      title: "",
      image: "",
      text: "",
      postDate: "",
    },
    editForm: {
      id: 0,
      title: "",
      image: "",
      text: "",
      postDate: "",
    },
    activeArticles: [],
    modalOpen: false,
  };

  getArticleList = () => {
    Axios.get(`${API_URL}/articles`)
      .then((res) => {
        this.setState({ articleList: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderArticleList = () => {
    return this.state.articleList.map((val, idx) => {
      const { title, image, text, postDate, id } = val;
      return (
        <>
          <tr
            onClick={() => {
              if (this.state.activeArticles.includes(idx)) {
                this.setState({
                  activeArticles: [
                    ...this.state.activeArticles.filter((item) => item !== idx),
                  ],
                });
              } else {
                this.setState({
                  activeArticles: [...this.state.activeArticles, idx],
                });
              }
            }}
          >
            <td> {idx + 1} </td>
            <td> {image} </td>
            <td className="text-left"> {title}</td>
            <td> {postDate}</td>
            <td> {text}</td>
            <td>
              <Button
                onClick={() => this.editBtnHandler(idx)}
                className="w-100"
                type="contained"
              >
                Edit
              </Button>
            </td>
            <td>
              <Button
                onClick={() => this.deleteHandler(id)}
                className="w-80"
                type="outlined"
              >
                Delete
              </Button>
            </td>
          </tr>
        </>
      );
    });
  };

  inputHandler = (e, field, form) => {
    let { value } = e.target;
    this.setState({
      [form]: {
        ...this.state[form],
        [field]: value,
      },
    });
  };

  addArticleHandler = () => {
    Axios.post(`${API_URL}/articles`, this.state.createForm)
      .then((res) => {
        swal("Success", "Your Articles been added to the list", "success");
        this.getArticleList();
        this.setState({
          createForm: {
            title: "",
            image: "",
            text: "",
            postDate: "",
          },
        });
        this.getArticleList();
      })
      .catch((err) => {
        swal("Error!", "Your item could not be added to the list", "error");
      });
  };

  editBtnHandler = (idx) => {
    this.setState({
      editForm: {
        ...this.state.articleList[idx],
      },
      modalOpen: true,
    });
  };

  editArticleHandler = () => {
    Axios.put(
      `${API_URL}/articles/${this.state.editForm.id}`,
      this.state.editForm
    )
      .then((res) => {
        swal("Success!", "Article data has been edited", "success");
        this.setState({ modalOpen: false });
        this.getarticleList();
      })
      .catch((err) => {
        swal("Error!", "Article data could not be edited", "error");
        console.log(err);
      });
  };

  deleteHandler = (id) => {
    Axios.delete(`${API_URL}/articles/${id}`)
      .then((res) => {
        swal("Success!", "Article data has been deleted", "success");
        this.getarticleList();
        console.log(id);
      })
      .catch((err) => {
        swal("Error!", "Article data could not be deleted", "error");
        console.log(err);
        console.log(id);
      });
  };

  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  componentDidMount() {
    this.getArticleList();
  }

  render() {
    return (
      <div className="container admin-container">
        <div className="dashboard">
          <caption className="p-3">
            <h2>Article</h2>
          </caption>
          <table className="admin-table text-center">
            <thead>
              <tr>
                <th>No.</th>
                <th>Article Image</th>
                <th className="text-left">Title</th>
                <th>Post Date</th>
                <th>Text</th>
                <th colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody>{this.renderArticleList()}</tbody>
          </table>
        </div>
        <div className="admin-form-container p-4">
          <caption className="mb-4 mt-2">
            <h2>Add Article</h2>
          </caption>
          <div className="row">
            <div className="col-8">
              <TextField
                value={this.state.createForm.title}
                placeholder="Title"
                onChange={(e) => this.inputHandler(e, "title", "createForm")}
              />
            </div>
            <div className="col-4">
              <TextField
                value={this.state.createForm.image}
                placeholder="Image"
                onChange={(e) => this.inputHandler(e, "image", "createForm")}
              />
            </div>
            <div className="col-6 mt-3">
              <TextField
                value={this.state.createForm.postDate}
                placeholder="Post Date"
                onChange={(e) => this.inputHandler(e, "postDate", "createForm")}
              />
            </div>
            <div className="col-6 mt-3">
              <TextField
                value={this.state.createForm.text}
                placeholder="Text"
                onChange={(e) => this.inputHandler(e, "text", "createForm")}
              />
            </div>

            <div className="col-3 mt-3">
              <Button onClick={this.addArticleHandler} type="contained">
                Add Article
              </Button>
            </div>
          </div>
        </div>

        <Modal
          toggle={this.toggleModal}
          isOpen={this.state.modalOpen}
          className="edit-modal"
        >
          <ModalHeader toggle={this.toggleModal}>
            <caption>
              <h3>Edit Data</h3>
            </caption>
          </ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-12 mt-3">
                <input
                  type="text"
                  className="custom-text-input h-100 pl-3"
                  value={this.state.editForm.title}
                  placeholder="Title"
                  onChange={(e) => this.inputHandler(e, "title", "editForm")}
                />
              </div>
              <div className="col-12 mt-3">
                <input
                  type="text"
                  className="custom-text-input h-100 pl-3"
                  value={this.state.editForm.image}
                  placeholder="Article's Image"
                  onChange={(e) => this.inputHandler(e, "image", "editForm")}
                />
              </div>
              <div className="col-12 mt-3">
                <input
                  type="text"
                  className="custom-text-input h-100 pl-3"
                  value={this.state.editForm.postDate}
                  placeholder="Post Date"
                  onChange={(e) => this.inputHandler(e, "postDate", "editForm")}
                />
              </div>
              <div className="col-12 mt-3">
                <input
                  type="text"
                  className="custom-text-input h-100 pl-3"
                  value={this.state.editForm.text}
                  placeholder="text"
                  onChange={(e) => this.inputHandler(e, "text", "editForm")}
                />
              </div>
              <div className="col-5 mt-5 offset-1">
                <Button
                  className="w-100"
                  onClick={this.toggleModal}
                  type="outlined"
                >
                  Cancel
                </Button>
              </div>
              <div className="col-5 mt-5">
                <Button
                  className="w-100"
                  onClick={this.editArticleHandler}
                  type="contained"
                >
                  Save
                </Button>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default AdminArticles;
