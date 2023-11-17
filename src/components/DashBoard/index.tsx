import React, { useContext, useEffect } from "react";
import AdminContext from "../../context/AdminContext";
import { Bar } from "react-chartjs-2";
// import { Chart, LinearScale, CategoryScale } from "chart.js";

import { Chart, registerables } from "chart.js";

import "./Dashboard.css";

Chart.register(...registerables);

const Dashboard = () => {
    const adminId = localStorage.getItem('adminIdFromFeTask');
  const [admin, setAdmin] = React.useState({
    adminId: adminId,
    adminDetails: {
        id: adminId,
        name: "",
        location: "",
        charge_customers: false,
        amount: {
            category_6: 0,
            category_7: 0,
            category_8: 0,
            category_9: 0,
            category_10: 0,
        },
    },
  });
//   const [chargeCustomers, setChargeCustomers] = React.useState(
//     admin.adminDetails.charge_customers 
//   );

  const [formValues, setFormValues] = React.useState({
    customAmount: admin.adminDetails.amount.category_6,
    regA: admin.adminDetails.amount.category_7,
    regB: admin.adminDetails.amount.category_8,
    regC: admin.adminDetails.amount.category_9,
    regD: admin.adminDetails.amount.category_10,
    chargeCustomers: admin.adminDetails.charge_customers,
  });

  useEffect(() => {
    const getAdminDetails = async () => {
      const adminDetails = await fetch(
        process.env.REACT_APP_API_URL + "/" + adminId
      );
      const adminDetailsResponse = await adminDetails.json();
      console.log("details", adminDetailsResponse);
      setAdmin({
        adminId: adminId,
        adminDetails: adminDetailsResponse.data,
      });
    };

    getAdminDetails();
  }, []);

  useEffect(() => {
    console.log("admin", admin);
    // setChargeCustomers(admin.adminDetails.charge_customers);
    setFormValues({
        customAmount: admin.adminDetails.amount.category_6,
        regA: admin.adminDetails.amount.category_7,
        regB: admin.adminDetails.amount.category_8,
        regC: admin.adminDetails.amount.category_9,
        regD: admin.adminDetails.amount.category_10,
        chargeCustomers: admin.adminDetails.charge_customers,
    })
  }, [admin]);

  console.log("admin context", admin);

  // Chart.register(LinearScale);
  // Chart.register(CategoryScale);

  // if the custom-amount is less 100, grey out the submit button
  // if the reg-a, reg-b, reg-c, reg-d are less than 79, 59, 39, 19 respectively, grey out the submit button
  const [isSubmitDisabled, setIsSubmitDisabled] = React.useState(false);

  useEffect(() => {
    const check = checkSubmitDisabled();
    console.log("check", check);
    setIsSubmitDisabled(checkSubmitDisabled());
  }, [formValues]);

  console.log("isSubmitDisabled", isSubmitDisabled);

  const checkSubmitDisabled = () => {
    if (formValues?.customAmount < 100) return true;
    if (formValues?.regA < 79) return true;
    if (formValues?.regB < 59) return true;
    if (formValues?.regC < 39) return true;
    if (formValues?.regD < 19) return true;
    if (!formValues?.chargeCustomers) return true;
    return false;
  };

  // disable form fields if chargeCustomers is false
  const [isDisabled, setIsDisabled] = React.useState(false);

  useEffect(() => {
    setIsDisabled(!formValues.chargeCustomers);
  }, [formValues.chargeCustomers]);

  console.log("isDisabled", isDisabled);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("submitted");

    const data = {
      charge_customers: formValues?.chargeCustomers,
      amount: {
        category_6: formValues?.customAmount,
        category_7: formValues?.regA,
        category_8: formValues?.regB,
        category_9: formValues?.regC,
        category_10: formValues?.regD,
      },
    };

    console.log("data", data);

    try {

        const updateDetails = await fetch(process.env.REACT_APP_API_URL + "/" + admin.adminId, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const updateDetailsResponse = await updateDetails.json();
        // alert(updateDetailsResponse);
    } catch (err) {
        console.error(err);
    }


  };

  console.log("formValues", formValues);

  // send user to login page if admin is not logged in
  if (!adminId) {
    window.location.href = "/login";
  }
  if (!admin || !admin?.adminDetails?.id) return <div>Loading...</div>;
  return (
    <div className="dashboard-admin">
      <div className="container">
        <h1>
          {admin?.adminDetails?.name}, {admin?.adminDetails?.location} on Dhun Jam
        </h1>

        <div className="control-entry">
          <span className="text">
            Do you want to charge your customers for requesting songs
          </span>
          <span className="control-btns">
            <div>
              <input
                type="radio"
                name="charge"
                id="charge"
                // value="yes"
                defaultChecked={formValues.chargeCustomers ? true : false}
                onChange={(e) => {
                  setFormValues({
                    ...formValues,
                    chargeCustomers: true,
                  });
                }}
              />
              <label htmlFor="charge">Yes</label>
            </div>

            <div>
              <input
                type="radio"
                name="charge"
                id="charge"
                // value="no"
                defaultChecked={formValues.chargeCustomers ? false : true}
                onChange={(e) => {
                  setFormValues({
                    ...formValues,
                    chargeCustomers: false,
                  });
                }}
              />
              <label htmlFor="charge">No</label>
            </div>
          </span>
        </div>

        <div className="control-entry">
          <span className="text">Custom song request amount*</span>
          <input
            type="number"
            min={99}
            className="custom-amount"
            name="custom-amount"
            id="custom-amount"
            placeholder="amount"
            value={formValues.customAmount}
            disabled={isDisabled}
            onChange={(e) => {
              console.log("e", e.target.value);
              setFormValues({
                ...formValues,
                customAmount: parseInt(e.target.value),
              });
            }}
          />
        </div>

        <div className="control-entry">
          <span className="text">
            Regular song request amounts, from high to low
          </span>
          <span className="regular-amount">
            <input
              type="number"
              name="reg-a"
              id="reg-a"
              placeholder="amount"
              value={formValues.regA}
              disabled={isDisabled}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  regA: parseInt(e.target.value),
                })
              }
            />
            <input
              type="number"
              name="reg-b"
              id="reg-b"
              placeholder="amount"
              value={formValues.regB}
              disabled={isDisabled}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  regB: parseInt(e.target.value),
                })
              }
            />
            <input
              type="number"
              name="reg-c"
              id="reg-c"
              placeholder="amount"
              value={formValues.regC}
              disabled={isDisabled}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  regC: parseInt(e.target.value),
                })
              }
            />
            <input
              type="number"
              name="reg-d"
              id="reg-d"
              placeholder="amount"
              value={formValues.regD}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  regD: parseInt(e.target.value),
                })
              }
              disabled={isDisabled}
            />
          </span>
        </div>

        {formValues.chargeCustomers && <div className="bar-graph">
          <Bar
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                yAxes: {
                  // beginAtZero: true,
                  // grid: {
                  //     color: '#F0C3F2'
                  // },
                  // ticks: {
                  //     color: '#F0C3F2'
                  // }
                  ticks: {
                    display: false
                  }
                },
              },
            }}
            data={{
              labels: [
                "Custom",
                "Category 1",
                "Category 2",
                "Category 3",
                "Category 4",
              ],
              datasets: [
                {
                  data: [
                    formValues.customAmount,
                    formValues.regA,
                    formValues.regB,
                    formValues.regC,
                    formValues.regD,
                  ],
                  borderWidth: 1,
                  label: "₹",
                  backgroundColor: "#F0C3F1",
                },
              ],
            }}
          />
        </div>}

        <div className="form-submit">
          <input
            type="submit"
            value="Save"
            className="submit-btn"
            disabled={isSubmitDisabled}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
