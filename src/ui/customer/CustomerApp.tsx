import React, { useEffect, useState } from "react";
import { getAllCustomer } from "../../service/customer-service";
import { getAllPosition } from "../../service/position-service";
import { getAllStatus } from "../../service/status-service";

export const initRequestDto = {
  page: 0,
  size: 3,
  sortDirection: "ASC",
  sortBy: "id",
  name: "",
  email: "",
  statusId: -1,
  positionId: -1,
};

const CustomerApp = () => {
  const [customers, setCustomers] = useState<any>();
  const [positions, setPositions] = useState<any>();
  const [status, setStatus] = useState<any>();
  const [requestDto, setRequestDto] = useState(initRequestDto);

  useEffect(() => {
    findAllCustomer(requestDto);
    findAllPositions();
    findAllStatus();
  }, []);

  const findAllPositions = () => {
    getAllPosition().then((res: any) => {
      setPositions(res);
    });
  };

  const findAllStatus = () => {
    getAllStatus().then((res: any) => {
      setStatus(res);
    });
  };

  const findAllCustomer = (requestDto: typeof initRequestDto) => {
    getAllCustomer(requestDto).then((customer: any) => {
      setCustomers(customer);
    });
  };

  const renderStatusColor = (status: any) => {
    if (status.id === 1) return "badge-success";
    if (status.id === 2) return "badge-primary";
    if (status.id === 3) return "badge-warning";
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setRequestDto({ ...requestDto, [name]: value });
  };

  const handleSearch = () => {
    findAllCustomer(requestDto);
  };

  const handleSort = (sortBy: string) => {
    const check = requestDto.sortDirection === "ASC" ? "DESC" : "ASC";
    const sortDirection = requestDto.sortBy === sortBy ? check : "ASC";
    const data = { ...requestDto, sortBy, sortDirection };
    setRequestDto(data);
    findAllCustomer(data);
  };

  function handleChangePage(page: number): void {
    const data = { ...requestDto, page };
    findAllCustomer(data);
  }

  const renderSortIcon = (sortBy: string) => {
    if (sortBy === requestDto.sortBy)
      return requestDto.sortDirection === "ASC" ? (
        <i className="fas fa-caret-up"></i>
      ) : (
        <i className="fas fa-caret-down"></i>
      );
  };

  if (!customers) return <div>Loading...</div>;

  return (
    <div className="container p-5">
      <h1 className="text-center mb-5">CUSTOMER MANAGEMENT</h1>
      <div className="row">
        <div className="col-6 mb-3">
          <div className="input-group">
            <input
              type="search"
              className="form-control rounded"
              placeholder="Name..."
              name="name"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="col-6 mb-3">
          <div className="input-group">
            <input
              type="search"
              className="form-control rounded"
              placeholder="Email..."
              name="email"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="col-6 mb-3">
          <select
            className="form-select"
            name="positionId"
            onChange={handleInputChange}
          >
            <option selected value={-1}>
              Choice position...
            </option>
            {positions &&
              positions.map((position: any) => (
                <option key={position.id} value={position.id}>
                  {position.name}
                </option>
              ))}
          </select>
        </div>
        <div className="col-6 mb-3">
          <select
            className="form-select"
            name="statusId"
            onChange={handleInputChange}
          >
            <option selected value={-1}>
              Choice status...
            </option>
            {status &&
              status.map((stt: any) => (
                <option
                  key={stt.id}
                  value={stt.id}
                  className={renderStatusColor(stt)}
                >
                  {stt.name}
                </option>
              ))}
          </select>
        </div>
        <div className="col-12">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={handleSearch}
          >
            search
          </button>
        </div>
      </div>

      <table className="table align-middle mb-0 bg-white">
        <thead className="bg-light">
          <tr>
            <th>
              <button
                className="btn btn-link"
                onClick={() => handleSort("name")}
              >
                Name {renderSortIcon("name")}
              </button>
            </th>
            <th>
              <button
                className="btn btn-link"
                onClick={() => handleSort("title")}
              >
                Title {renderSortIcon("title")}
              </button>
            </th>
            <th>
              <button
                className="btn btn-link"
                onClick={() => handleSort("customerStatus")}
              >
                Status {renderSortIcon("customerStatus")}
              </button>
            </th>
            <th>
              <button
                className="btn btn-link"
                onClick={() => handleSort("customerPosition")}
              >
                Position {renderSortIcon("customerPosition")}
              </button>
            </th>
            <th>
              <button className="btn btn-link">Actions</button>
            </th>
          </tr>
        </thead>
        <tbody>
          {customers.content.map((customer: any) => (
            <tr key={customer.id}>
              <td>
                <div className="d-flex align-items-center">
                  <img
                    src={customer.avatar}
                    alt=""
                    style={{ width: "45px", height: "45px" }}
                    className="rounded-circle"
                  />
                  <div className="ms-3">
                    <p className="fw-bold mb-1">{customer.name}</p>
                    <p className="text-muted mb-0">{customer.email}</p>
                  </div>
                </div>
              </td>
              <td>
                <p className="fw-normal mb-1">{customer.title}</p>
                <p className="text-muted mb-0">{customer.description}</p>
              </td>
              <td>
                <span
                  className={`badge ${renderStatusColor(
                    customer.customerStatus
                  )} rounded-pill d-inline`}
                >
                  {customer.customerStatus.name}
                </span>
              </td>
              <td>{customer.customerPosition.name}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-link btn-sm btn-rounded"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="container mt-3">
        {customers.content.length > 0 && (
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item">
                <button
                  className={`page-link ${
                    customers.number === 0 && "disabled"
                  }`}
                  disabled={customers.number === 0}
                  onClick={() => handleChangePage(customers.number - 1)}
                >
                  Previous
                </button>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <button
                  className={`page-link ${
                    customers.number === customers.totalPages - 1 && "disabled"
                  }`}
                  disabled={customers.number === customers.totalPages - 1}
                  onClick={() => handleChangePage(customers.number + 1)}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
};

export default CustomerApp;
