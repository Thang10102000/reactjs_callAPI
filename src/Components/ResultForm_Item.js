import React, { Component } from "react";

class ResultFormItem extends Component {
  constructor(props) {
    super(props);
    this.Cretate_Date = "24/07/2021";
  }
  // Hàm xử lý khi click vào nút delete
  onDeleteForm = (id) => {
    this.props.onDeleteForm(id);
  };
  // Khai báo hàm khi nhấn vào nút Edit
  onDUpdateForm = (id) => {
    this.props.onDUpdateForm(id);
  };
  render() {
    const { listAccounts } = this.props;
    const rows = listAccounts.map((account, index) => {
      return (
        <React.Fragment>
          {/* <> */}
          <tr>
            <td>{account.ID}</td>
            <td>{account.Email}</td>
            <td>{account.Username}</td>
            <td>{account.Fullname}</td>
            <td>{account.Department}</td>
            <td>{account.Position}</td>
            <td>{account.Cretate_Date}</td>
            <td>
              <button className="btn btn-warning" onClick={() => this.onDUpdateForm(account.ID)}>
                Edit
              </button>
            </td>
            <td>
              <button className="btn btn-warning" onClick={() => this.onDeleteForm(account.ID)}>
                Delete
              </button>
            </td>
          </tr>
          {/* </> */}
        </React.Fragment>
      );
    });
    return rows;
  }
}

export default ResultFormItem;
