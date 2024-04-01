import React, { useEffect, useState } from "react";
import { getAllEmployee } from "../../service/employee-service";

const EmployeeApp = () => {
  const [employeeList, setEmployeeList] = useState<any>();

  useEffect(() => {
    findAllEmployee();
  }, []);

  const findAllEmployee = () => {
    getAllEmployee().then((res) => {
      setEmployeeList(res);
    });
  };

  const renderStatusClass = (statusId: number) => {
    if (statusId === 1) return "badge badge-success rounded-pill d-inline";
    if (statusId === 2) return "badge badge-primary rounded-pill d-inline";
    if (statusId === 3) return "badge badge-warning rounded-pill d-inline";
  };

  if (!employeeList) return <div>Loading...</div>;

  return (
    <div className="container p-5">
      <h1 className="text-center mb-5">EMPLOYEE MANAGEMENT</h1>
      <table className="table align-middle mb-0 bg-white">
        <thead className="bg-light">
          <tr>
            <th>Name</th>
            <th>Title</th>
            <th>Status</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employeeList.map((emp: any) => (
            <tr key={emp.id}>
              <td>
                <div className="d-flex align-items-center">
                  <img
                    src={emp.avatar}
                    alt=""
                    style={{ width: "45px", height: "45px" }}
                    className="rounded-circle"
                  />
                  <div className="ms-3">
                    <p className="fw-bold mb-1">{emp.name}</p>
                    <p className="text-muted mb-0">{emp.email}</p>
                  </div>
                </div>
              </td>
              <td>
                <p className="fw-normal mb-1">{emp.title}</p>
                <p className="text-muted mb-0">{emp.description}</p>
              </td>
              <td>
                <span className={renderStatusClass(emp.employeeStatus.id)}>
                  {emp.employeeStatus.name}
                </span>
              </td>
              <td>{emp.employeePosition.name}</td>
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
    </div>
  );
};

export default EmployeeApp;
