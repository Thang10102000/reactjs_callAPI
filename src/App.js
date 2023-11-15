import React, { Component } from "react";
import "./App.css";
import InputForm from "./Components/InputForm";
import ResultForm from "./Components/ResultForm";
import SearchForm from "./Components/SearchForm";
import Axios from 'axios';
import { AccountApi } from "./Api/AccountApi";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listAccounts: [],
      isShowInputForm: false,
      accountUpdate: null,
      search_key: null,
    };
  }

  componentDidMount() {
    // if (localStorage && localStorage.getItem("listAccounts")) {
    //   let listAccounts = JSON.parse(localStorage.getItem("listAccounts"));
    //   this.setState({
    //     listAccounts: listAccounts,
    //   });
    // }

    this.getlistAccounts();

  }

  //getlistAccounts = () => {
  // const baseURL = `http://localhost:8080`;
  // Axios.get(`${baseURL}/api/v1/accounts`)
  //   .then(response => {
  //     console.log("dữ liệu nhận được ", response);
  //     console.log(response.data)
  //     let listAccounts_API = response.data  // Khai báo list temp để lưu dữ liệu nhận được
  //     // let listAccounts = this.state.listAccounts // lấy lại listAccounts để set lại giá trí
  //     let listAccounts = []
  //     // Đoạn lệnh dưới thực hiện chuyển đổi dữ liệu nhận được từ API thành dữ liệu list đang sử dụng trong project, dữ liêu khác Key
  //     for (let index = 0; index < listAccounts_API.length; index++) {
  //       let account = {
  //         'ID': listAccounts_API[index].id,
  //         'Email': listAccounts_API[index].email,
  //         'Username': listAccounts_API[index].username,
  //         'Fullname': listAccounts_API[index].fullname,
  //         'Department': listAccounts_API[index].department,
  //         'Position': listAccounts_API[index].position,
  //         'Cretate_Date': listAccounts_API[index].createDate,
  //       };
  //       listAccounts.push(account) // đổ dữ liệu vào list            
  //     }
  //     this.setState({
  //       listAccounts: listAccounts  // Đổ dữ liệu vào State đang lưu listAccounts.
  //     });
  //   })
  //   .catch(error => console.log(error));
  //}
  // Viết function


  getlistAccounts = async () => {
    try {

      const response = await AccountApi.getAll();
      console.log("Thông tin asyn: response: ", response);
      let listAccounts_API = response;
      let listAccounts = [];
      for (let index = 0; index < listAccounts_API.length; index++) {
        let account = {
          ID: listAccounts_API[index].id,
          Email: listAccounts_API[index].email,
          Username: listAccounts_API[index].username,
          Fullname: listAccounts_API[index].fullname,
          Department: listAccounts_API[index].department,
          Position: listAccounts_API[index].position,
          Cretate_Date: listAccounts_API[index].createDate,
        };
        listAccounts.push(account);
      }
      this.setState({
        listAccounts: listAccounts,
      });
    } catch (error) {
      alert("Đã xảy ra lỗi khi load dữ liệu Account!!");
    }
  };


  showInputForm = () => {
    this.setState({
      isShowInputForm: !this.state.isShowInputForm,
    });
  };
  onshowForm = () => {
    this.setState({
      isShowInputForm: !this.state.isShowInputForm,
    });
  };

  onSaveForm = async (data) => {

    try {
      const body = {
        email: data.Email,
        username: data.Username,
        fullname: data.Fullname,
        departmentId: data.Department,
        positionId: data.Position, // data.Position giá trị này được truyền theo value của thẻ select, ở đây đã trả ra posID
      };
      await AccountApi.create(body);
      this.getlistAccounts(); // gọi lại hàm này để cập nhật dữ liệu sau khi thêm mới thành công
    } catch (error) {
      alert("Đã xảy ra lỗi khi thêm mới Account vào hệ thống !!");
    }

  };


  onDUpdateForm = (id) => {
    console.log("ID của Account cần update: ", id);
    let listAccounts = this.state.listAccounts;
    let indexAccountUpdate = listAccounts.findIndex((account) => account.ID === id);
    if (indexAccountUpdate !== -1) {
      // let isShowInputForm = this.state.isShowInputForm;
      // isShowInputForm = true;
      this.setState({
        isShowInputForm: true,
      });

      console.log("Index của Account cần update: ", indexAccountUpdate);
      let accountUpdate = listAccounts[indexAccountUpdate];
      console.log("Thông tin Account cần update: ", accountUpdate);

      this.setState({
        accountUpdate: accountUpdate,
      });
    }
  };

  // Hàm xử lý update dữ liệu vào list
  // update_Account_Button = (account) => {
  //   console.log("Dữ liệu account update là: ", account);
  //   let listAccounts = this.state.listAccounts;
  //   let indexAccount_Update = listAccounts.findIndex((account1) => account1.ID === account.ID);
  //   if (indexAccount_Update !== -1) {
  //     listAccounts[indexAccount_Update] = account; // Thực hiện sửa lại Account theo data nhận được
  //     this.setState({
  //       listAccounts: listAccounts,
  //     });
  //     localStorage.setItem("listAccounts", JSON.stringify(listAccounts)); // Lưu lại dữ liệu xuống local Storage
  //   }
  // };
  // Xử lý search dữ liệu
  update_Account_Button = async (data) => {
    try {
      let id = data.ID;
      const body = {
        fullname: data.Fullname, // data.Fullname lấy theo state của InputForm
        departmentId: data.Department, // data.Department giá trị này được truyền theo value của thẻ select, ở đây đã trả ra depID
        positionId: data.Position, // data.Position giá trị này được truyền theo value của thẻ select, ở đây đã trả ra posID
      };
      await AccountApi.updateByID(id, body);
      this.getlistAccounts(); // gọi lại hàm này để cập nhật dữ liệu sau khi thêm mới thành công
    } catch (error) {
      alert("Đã xảy ra lỗi khi update Account trên hệ thống !!");
    }
  }
  onSearchForm = (data) => {
    console.log("Dữ liệu search từ APP: ", data);
    this.setState({
      search_key: data,
    });
  };


  onDeleteForm = async (id) => {
    try {
      await AccountApi.deleteByID(id);
      this.getlistAccounts(); // gọi lại hàm này để cập nhật dữ liệu sau khi xóa thành công.
    } catch (error) {
      alert("Đã xảy ra lỗi khi xóa Account trên hệ thống !!");
    }
  }


  render() {
    let accountUpdate = this.state.accountUpdate;
    let isShowInputForm = this.state.isShowInputForm;
    let inputForm_Element;
    let listAccounts = this.state.listAccounts;
    if (isShowInputForm) {
      inputForm_Element = <InputForm onshowForm={this.onshowForm} onSaveForm={this.onSaveForm} accountUpdate={accountUpdate} update_Account_Button={this.update_Account_Button} />;
    } else {
      inputForm_Element = "";
    }
    let search_key = this.state.search_key;

    if (search_key) {
      let listAccounts_filter = [];
      for (let index = 0; index < listAccounts.length; index++) {
        if (
          //listAccounts[index].ID.toLowerCase().includes(search_key.toLowerCase()) ||
          listAccounts[index].Email.toLowerCase().includes(search_key.toLowerCase()) ||
          listAccounts[index].Username.toLowerCase().includes(search_key.toLowerCase()) ||
          listAccounts[index].Fullname.toLowerCase().includes(search_key.toLowerCase()) ||
          listAccounts[index].Department.toLowerCase().includes(search_key.toLowerCase()) ||
          listAccounts[index].Position.toLowerCase().includes(search_key.toLowerCase()) //||
          //listAccounts[index].Cretate_Date.toLowerCase().includes(search_key.toLowerCase())
        ) {
          listAccounts_filter.push(listAccounts[index]); // Lấy các phần tử thỏa mãn đk search_key lưu vào listAccounts_filter trung gian
        }
      }
      listAccounts = listAccounts_filter;
    }
    //
    return (
      <div className="App">
        <div className="container">
          <input type="button" className="btn btn-success" id="Create_btn" value="Create Account" onClick={this.showInputForm}></input>
          {inputForm_Element}
          {/* ô search dữ liệu */}
          <SearchForm onSearchForm={this.onSearchForm} />
          {/*  */}
          <ResultForm listAccounts={listAccounts} onDeleteForm={this.onDeleteForm} onDUpdateForm={this.onDUpdateForm} />
        </div>
      </div>
    );
  }
}

export default App;
