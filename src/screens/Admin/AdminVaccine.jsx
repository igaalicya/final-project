import React from "react";
import "./AdminMembers.css";
import { Modal, ModalHeader, ModalBody, Table } from "reactstrap";
import Axios from "axios";
import { API_URL } from "../../constants/API";
import swal from "sweetalert";
import Button from "../../components/Buttons/Button";
import TextField from "../../components/TextField/TextField";
import { priceFormatter } from "../../supports/helpers/formatter";

class AdminVaccine extends React.Component {
  currentPage = 0;
  state = {
    selectedFile: null,
    VaccineList: [],
    categoryList: [],
    vaccinePage: [],
    categoriesId: 1,
    categoriesIdEdit: 0,
    currentPage: 0,
    countPages: 0,
    countVaccines: 0,
    createForm: {
      vaccineName: "",
      price: 0,
      ageOfDose: 0,
      description: "",
      brand: "",
      image: "",
      stock: 0,
      categories: {},
    },
    editForm: {
      id: 0,
      vaccineName: "",
      price: 0,
      ageOfDose: 0,
      description: "",
      brand: "",
      image: "",
      stock: 0,
      categories: {},
    },
    activeUsers: [],
    modalOpen: false,
    categories: {},
    categoryFilter: "all",
    minPrice: 0,
    maxPrice: 999999999,
    searchValue: "",
    orderBy: "vaccineNameAsc",
  };

  getVaccineList = () => {
    Axios.get(`${API_URL}/vaccines`)
      .then((res) => {
        this.setState({ VaccineList: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getVaccineListPerPage = (categories) => {
    this.getCountVaccines();
    if (categories === "all") {
      Axios.get(
        `${API_URL}/vaccines/page/${this.currentPage}/${this.state.orderBy}/${this.state.minPrice}/${this.state.maxPrice}`,
        {
          params: {
            vaccineName: this.state.searchValue,
          },
        }
      )
        .then((res) => {
          this.setState({ vaccinePage: res.data });
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Axios.get(
        `${API_URL}/vaccines/page/categories/${this.currentPage}/${this.state.orderBy}/${this.state.minPrice}/${this.state.maxPrice}`,
        {
          params: {
            vaccineName: this.state.searchValue,
            categoriesName: categories,
          },
        }
      )
        .then((res) => {
          this.setState({ vaccinePage: res.data });
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  getCountVaccines = () => {
    if (this.state.categoryFilter === "all") {
      Axios.get(
        `${API_URL}/vaccines/count/all/${this.state.minPrice}/${this.state.maxPrice}`,
        {
          params: {
            vaccineName: this.state.searchValue,
          },
        }
      )
        .then((res) => {
          this.setState({
            countVaccines: res.data,
          });
          console.log(this.state.countVaccines);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Axios.get(
        `${API_URL}/vaccines/count/categories/${this.state.minPrice}/${this.state.maxPrice}`,
        {
          params: {
            vaccineName: this.state.searchValue,
            categoriesName: this.state.categoryFilter,
          },
        }
      )
        .then((res) => {
          this.setState({
            countVaccines: res.data,
          });
          console.log(this.state.countVaccines);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  renderButton() {
    let arr = [];
    let j = 0;
    for (let i = 0; i < this.state.countVaccines; i++) {
      if (i % 9 === 0) {
        arr.push(
          <Button
            key={i.toString()}
            className="ml-1 btn-page"
            onClick={() => this.goToPage(i)}
          >
            {j + 1}{" "}
          </Button>
        );
        j = j + 1;
      }
    }
    return arr;
  }

  goToPage = (i) => {
    // kalo pake state gabisa langsung keganti
    this.currentPage = i;
    console.log(this.currentPage);
    this.getVaccineListPerPage(this.state.categoryFilter);
    this.currentPage = i;
  };

  getCategories = () => {
    Axios.get(`${API_URL}/categories/id`, {
      params: {
        id: this.state.categoriesId,
      },
    })
      .then((res) => {
        this.setState({ categories: res.data });
        console.log(this.state.categories);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderVaccineList = () => {
    return this.state.vaccinePage.map((val, idx) => {
      const { vaccineName, price, ageOfDose, brand, stock, id } = val;
      return (
        <>
          <tr
            onClick={() => {
              if (this.state.activeUsers.includes(idx)) {
                this.setState({
                  activeUsers: [
                    ...this.state.activeUsers.filter((item) => item !== idx),
                  ],
                });
              } else {
                this.setState({
                  activeUsers: [...this.state.activeUsers, idx],
                });
              }
            }}
          >
            <td> {idx + 1} </td>
            <td> {vaccineName} </td>
            <td> {priceFormatter(price)} </td>
            <td> {ageOfDose}</td>
            <td> {brand}</td>
            <td> {stock} </td>
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
                className="w-80 custom-btn-danger"
                type="contained"
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

  fileChangeHandler = (e) => {
    this.setState({ selectedFile: e.target.files[0] });
  };

  getCategoriesList = () => {
    Axios.get(`${API_URL}/categories`)
      .then((res) => {
        this.setState({ categoryList: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  optionData = () => {
    return this.state.categoryList.map((val) => {
      const { categoryName, id } = val;
      return <option value={id}>{categoryName}</option>;
    });
  };

  optionDataCategory = () => {
    return this.state.categoryList.map((val) => {
      const { categoryName, id } = val;
      return <option value={categoryName}>{categoryName}</option>;
    });
  };

  addVaccineHandler = () => {
    this.setState({
      createForm: {
        ...this.state.createForm,
      },
    });

    let formData = new FormData();

    if (this.state.selectedFile) {
      formData.append(
        "file",
        this.state.selectedFile,
        this.state.selectedFile.name
      );
    }

    formData.append("vaccinesData", JSON.stringify(this.state.createForm));

    if (
      this.state.createForm.ageOfDose &&
      this.state.createForm.brand &&
      this.state.createForm.description &&
      this.state.createForm.price &&
      this.state.createForm.stock &&
      this.state.createForm.vaccineName
    ) {
      Axios.post(`${API_URL}/vaccines/${this.state.categoriesId}`, formData)
        .then((res) => {
          swal("Success", "Your items has been added to the list", "success");
          this.getVaccineListPerPage(this.state.categoryFilter);
          this.setState({
            createForm: {
              vaccineName: "",
              price: "",
              ageOfDose: "",
              description: "",
              brand: "",
              image: "",
              stock: 0,
            },
            selectedFile: null,
          });
          this.getVaccineListPerPage(this.state.categoryFilter);
        })
        .catch((err) => {
          swal("Error!", "Your item could not be added to the list", "error");
        });
    } else {
      swal("Error!", "field can't be empty", "error");
    }
  };

  editBtnHandler = (idx) => {
    this.setState({
      editForm: {
        ...this.state.vaccinePage[idx],
      },
      categoriesIdEdit: this.state.vaccinePage[idx].categories.id,
      // selectedFile: this.state.VaccineList[idx].image,
      modalOpen: true,
    });
    console.log(this.state.vaccinePage[idx]);
    console.log(this.state.vaccinePage[idx].categories);
  };

  editVaccineHandler = () => {
    let formData = new FormData();
    if (this.state.selectedFile) {
      formData.append(
        "file",
        this.state.selectedFile,
        this.state.selectedFile.name
      );
    }

    formData.append("vaccinesData", JSON.stringify(this.state.editForm));

    Axios.put(
      `${API_URL}/vaccines/edit/${this.state.editForm.id}/${this.state.categoriesIdEdit}`,
      formData
    )
      .then((res) => {
        swal("Success!", "Vaccine data has been edited", "success");
        this.setState({ modalOpen: false, categoriesIdEdit: 4 });
        this.getVaccineListPerPage(this.state.categoryFilter);
      })
      .catch((err) => {
        swal("Error!", "Vaccine data could not be edited", "error");
        console.log(err);
      });
  };

  deleteHandler = (id) => {
    console.log(id);
    Axios.delete(`${API_URL}/vaccines/${id}`)
      .then((res) => {
        swal("Success!", "Vaccine data has been deleted", "success");
        this.getVaccineListPerPage(this.state.categoryFilter);
      })
      .catch((err) => {
        swal("Error!", "Vaccine data could not be deleted", "error");
        console.log(err);
      });
  };

  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  componentDidMount() {
    this.getCountVaccines();
    this.getVaccineList();
    this.getCategories();
    this.getCategoriesList();
    this.getVaccineListPerPage(this.state.categoryFilter);
  }

  render() {
    return (
      <div className="container admin-container">
        <div className="dashboard">
          <caption className="p-3">
            <h2>Vaccine</h2>
          </caption>
          <div className="row form-wrap">
            <div className="col-lg-3 form-cols">
              {/* <input
                  onChange={this.props.onChangeSearch}
                  onFocus={this.onFocus}
                  onBlur={this.onBlur}
                  className={`search-bar ${
                    this.state.searchBarIsFocused ? "active" : null
                  }`}
                  type="text"
                  placeholder="Cari produk impianmu disini"
                  className="form-control"
                /> */}
              <input
                type="text"
                onKeyUp={() =>
                  this.getVaccineListPerPage(this.state.categoryFilter)
                }
                className="form-control mr-4"
                placeholder="search vaccine name here"
                onChange={(e) => this.setState({ searchValue: e.target.value })}
              />
            </div>
            <div className="col-lg-2 form-cols">
              <input
                type="text"
                className="form-control"
                name="search"
                placeholder="min price"
                onKeyUp={() =>
                  this.getVaccineListPerPage(this.state.categoryFilter)
                }
                onChange={(e) => this.setState({ minPrice: +e.target.value })}
              />
            </div>
            <div className="col-lg-2 form-cols">
              <input
                type="text"
                className="form-control"
                name="search"
                placeholder="max price"
                onKeyUp={() =>
                  this.getVaccineListPerPage(this.state.categoryFilter)
                }
                onChange={(e) =>
                  this.setState({ maxPrice: 1 * e.target.value })
                }
              />
            </div>
            <div className="col-lg-2 form-cols">
              <select
                value={this.state.categoryFilter}
                onChange={(e) =>
                  this.setState({ categoryFilter: e.target.value })
                }
                className="form-control"
                onClick={() =>
                  this.getVaccineListPerPage(this.state.categoryFilter)
                }
              >
                <option value="all">All</option>
                {this.optionDataCategory()}
              </select>
            </div>
            <div className="col-lg-3 form-cols">
              <select
                className="form-control"
                value={this.state.orderBy}
                onChange={(e) => this.setState({ orderBy: e.target.value })}
                onClick={() =>
                  this.getVaccineListPerPage(this.state.categoryFilter)
                }
              >
                <option value="vaccineNameAsc">Vaccine Name (a-z)</option>
                <option value="vaccineNameDesc">Vaccine Name (z-a)</option>
                <option value="priceAsc">Price (low-high)</option>
                <option value="priceDesc">Price (high-low)</option>
              </select>
            </div>
          </div>

          <table className="admin-table text-center">
            <thead>
              <tr>
                <th>No.</th>
                <th>Vaccine Name</th>
                <th>Price</th>
                <th>Age of dose</th>
                <th>Merk</th>
                <th>Stock</th>
                <th colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody>{this.renderVaccineList()}</tbody>
          </table>
        </div>
        <div className=" row justify-content-center m-3">
          {this.renderButton()}
        </div>
        <div className="admin-form-container p-4">
          <caption className="mb-4">
            <h2>Add Vaccine</h2>
          </caption>
          <div className="row">
            <div className="col-8">
              <TextField
                value={this.state.createForm.vaccineName}
                placeholder="Vaccine Name"
                onChange={(e) =>
                  this.inputHandler(e, "vaccineName", "createForm")
                }
              />
            </div>
            <div className="col-4">
              <TextField
                value={this.state.createForm.price}
                placeholder="Price"
                onChange={(e) => this.inputHandler(e, "price", "createForm")}
              />
            </div>
            <div className="col-6 mt-3">
              <TextField
                value={this.state.createForm.ageOfDose}
                placeholder="Age of Dose"
                onChange={(e) =>
                  this.inputHandler(e, "ageOfDose", "createForm")
                }
              />
            </div>
            <div className="col-6 mt-3">
              <TextField
                value={this.state.createForm.brand}
                placeholder="Brand"
                onChange={(e) => this.inputHandler(e, "brand", "createForm")}
                required="true"
              />
            </div>
            <div className="col-6 mt-3">
              <TextField
                value={this.state.createForm.stock}
                placeholder="Stock"
                onChange={(e) => this.inputHandler(e, "stock", "createForm")}
              />
            </div>
            <div className="col-6 mt-3">
              <select
                value={this.state.categoriesId}
                onChange={(e) =>
                  this.setState({
                    categoriesId: e.target.value,
                  })
                }
                className="form-control"
              >
                {this.optionData()}
              </select>
              {console.log(this.state.categoriesId)}
            </div>
            <div className="col-12 mt-3">
              <input
                type="file"
                name="Image"
                onChange={(e) => {
                  this.fileChangeHandler(e, "selectedFile");
                }}
              />
            </div>
            <div className="col-12 mt-3">
              <textarea
                value={this.state.createForm.description}
                onChange={(e) =>
                  this.inputHandler(e, "description", "createForm")
                }
                style={{ resize: "none" }}
                placeholder="Description"
                className="custom-text-input"
              ></textarea>
            </div>
            <div className="col-3 mt-3">
              <Button onClick={this.addVaccineHandler} type="contained">
                Add Vaccine
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
              <h3>Edit Vaccine</h3>
            </caption>
          </ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-12">
                <input
                  type="text"
                  className="custom-text-input h-100 pl-3"
                  value={this.state.editForm.vaccineName}
                  placeholder="Vaccine Name"
                  onChange={(e) =>
                    this.inputHandler(e, "vaccineName", "editForm")
                  }
                />
              </div>
              <div className="col-12 mt-3">
                <input
                  type="text"
                  className="custom-text-input h-100 pl-3"
                  value={this.state.editForm.price}
                  placeholder="Price"
                  onChange={(e) => this.inputHandler(e, "price", "editForm")}
                />
              </div>
              <div className="col-12 mt-3">
                <input
                  type="text"
                  className="custom-text-input h-100 pl-3"
                  value={this.state.editForm.ageOfDose}
                  placeholder="Age Of Dose"
                  onChange={(e) =>
                    this.inputHandler(e, "ageOfDose", "editForm")
                  }
                />
              </div>
              <div className="col-12 mt-3">
                <input
                  type="text"
                  value={this.state.editForm.brand}
                  className="custom-text-input h-100 pl-3"
                  onChange={(e) => this.inputHandler(e, "brand", "editForm")}
                />
              </div>
              <div className="col-12 mt-3">
                <input
                  type="text"
                  value={this.state.editForm.stock}
                  className="custom-text-input h-100 pl-3"
                  onChange={(e) => this.inputHandler(e, "stock", "editForm")}
                />
              </div>
              <div className="col-12 mt-3">
                <select
                  value={this.state.categoriesIdEdit}
                  onChange={(e) =>
                    this.setState({
                      categoriesIdEdit: e.target.value,
                    })
                  }
                  className="form-control"
                >
                  {this.optionData()}
                </select>
              </div>
              <div className="col-12 mt-3">
                <img
                  alt="..."
                  className="ml-4"
                  style={{ width: "30%" }}
                  src={this.state.editForm.image}
                />
                <input
                  type="file"
                  name="Image"
                  onChange={(e) => {
                    this.fileChangeHandler(e, "selectedFile");
                  }}
                />
              </div>
              <div className="col-12 mt-3">
                <textarea
                  value={this.state.editForm.description}
                  onChange={(e) =>
                    this.inputHandler(e, "description", "editForm")
                  }
                  style={{ resize: "none" }}
                  placeholder="Description"
                  className="custom-text-input"
                ></textarea>
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
                  onClick={this.editVaccineHandler}
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

export default AdminVaccine;
