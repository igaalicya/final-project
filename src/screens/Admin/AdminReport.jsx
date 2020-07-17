import React from "react";
import "./AdminMembers.css";
import Axios from "axios";
import { API_URL } from "../../constants/API";
import { Line, Bar } from "react-chartjs-2";

class AdminReport extends React.Component {
  state = {
    reportList: [],
    categoryList: [],
    reportListCategory: [],
    editForm: {
      id: 0,
      fullName: "",
      image: "",
      specialist: "",
      address: "",
      phone: "",
      desc: "",
    },
    activeUsers: [],
    modalOpen: false,
    chartData: {},
    categoryFilter: "all",
    minPrice: 0,
    maxPrice: 999999999,
    searchBarIsFocused: false,
    searcBarInput: "",
    searchValue: "",
  };

  getReportList = () => {
    Axios.get(`${API_URL}/transactions/details/report`)
      .then((res) => {
        console.log(res.data);
        this.setState({ reportList: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderChartData = () => {
    Axios.get(`${API_URL}/transactions/details/report`).then((res) => {
      console.log(res);

      const transactionsData = res.data;

      let vaccineName = [];

      let quantity = [];

      transactionsData.forEach((val) => {
        vaccineName.push(val.vaccines.vaccineName);

        quantity.push(val.quantity);
      });

      this.setState({
        chartData: {
          labels: vaccineName,

          datasets: [
            {
              label: "Vaccine Reports",

              data: quantity,

              backgroundColor: [
                "#3cb371",

                "#0000FF",

                "#9966FF",

                "#4C4CFF",

                "#00FFFF",

                "#f990a7",

                "#aad2ed",

                "#FF00FF",

                "Blue",

                "Red",
              ],
            },
          ],
        },
      });
    });
  };

  getReportListCategories = (categories) => {
    console.log(categories);
    if (categories === "all") {
      Axios.get(
        `${API_URL}/transactions/details/report/all/${this.state.minPrice}/${this.state.maxPrice}`,
        {
          params: {
            vaccineName: this.state.searchValue,
          },
        }
      )
        .then((res) => {
          this.setState({ reportListCategory: res.data });
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Axios.get(
        `${API_URL}/transactions/details/report/categories/${this.currentPage}/${this.state.minPrice}/${this.state.maxPrice}`,
        {
          params: {
            vaccineName: this.state.searchValue,
            categoriesName: categories,
          },
        }
      )
        .then((res) => {
          this.setState({ reportListCategory: res.data });
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  renderReportList = () => {
    return this.state.reportListCategory.map((val, idx) => {
      const { vaccines, quantity } = val;
      return (
        <tr
          key={idx.toString()}
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
          <td className="text-left"> {vaccines.vaccineName}</td>
          <td>{vaccines.price}</td>
          <td> {quantity} </td>
        </tr>
      );
    });
  };

  getCategories = () => {
    Axios.get(`${API_URL}/categories`)
      .then((res) => {
        this.setState({ categoryList: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  optionData = () => {
    return this.state.categoryList.map((val, idx) => {
      const { categoryName } = val;
      return (
        <option key={idx.toString()} value={categoryName}>
          {categoryName}
        </option>
      );
    });
  };

  componentDidMount() {
    this.getReportList();
    this.renderChartData();
    this.getCategories();
    this.getReportListCategories(this.state.categoryFilter);
  }

  render() {
    return (
      <div className="container admin-container">
        <div className="dashboard">
          <caption className="p-3">
            <h2>Report Charts</h2>
          </caption>
          <div className="container-chart">
            <Bar
              data={this.state.chartData}
              options={{
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        beginAtZero: true,
                      },
                    },
                  ],
                },

                maintainAspectRatio: false,
              }}
              height="300px"
            />
          </div>

          <caption className="p-3">
            <h2>Report Table</h2>
          </caption>
          <div className="row form-wrap">
            <div className="col-lg-3 form-cols">
              <input
                type="text"
                onKeyUp={() =>
                  this.getReportListCategories(this.state.categoryFilter)
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
                  this.getReportListCategories(this.state.categoryFilter)
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
                  this.getReportListCategories(this.state.categoryFilter)
                }
                onChange={(e) =>
                  this.setState({ maxPrice: 1 * e.target.value })
                }
              />
            </div>
            <div className="col-lg-3 form-cols">
              <select
                value={this.state.categoryFilter}
                onChange={(e) =>
                  this.setState({ categoryFilter: e.target.value })
                }
                className="form-control"
                onClick={() =>
                  this.getReportListCategories(this.state.categoryFilter)
                }
              >
                <option value="all">All</option>
                {this.optionData()}
              </select>
            </div>
          </div>
          <table className="admin-table text-center pt-4">
            <thead>
              <tr>
                <th>No.</th>
                <th className="text-left">Vaccine Name</th>
                <th>Price</th>
                <th>Item Sold</th>
              </tr>
            </thead>
            <tbody>{this.renderReportList()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default AdminReport;
