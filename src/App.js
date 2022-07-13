import React, { useEffect, useState } from "react";
import Current from "./components/currentBalance/Current";
import classes from "./App.module.css";
import Movements from "./components/movements/Movements";
import Transfer from "./components/operations/transferMoney/Transfer";
import Loan from "./components/operations/loan/Loan";
import Close from "./components/operations/closeAccount/Close";
import Login from "./components/login/Login";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { accActions } from "./store";

function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const accData = useSelector((state) => state);
  console.log(accData);
  const { movements } = accData;
  console.log(movements);
  const dispatch = useDispatch();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [error, setErrror] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(
        "https://react-http-e229d-default-rtdb.firebaseio.com/accounts.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      console.log(data.acc1);
      dispatch(accActions.replaceData(data.acc1));
      setDataLoaded(true);
      setIsLoading(false);
    };
    fetchData().catch((error) => {
      setErrror(error.message);
      console.log(error.message);
      setIsLoading(false);
    });
  }, [dispatch, dataLoaded]);

  useEffect(() => {
    const sendData = async () => {
      if (!dataLoaded) {
        return;
      }
      console.log("ariqa");
      const response = await fetch(
        "https://react-http-e229d-default-rtdb.firebaseio.com/accounts/acc1.json",
        {
          method: "PUT",
          body: JSON.stringify(accData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed send data");
      }
    };
    sendData().catch((error) => {
      console.log(error);
    });
  }, [dispatch, accData, dataLoaded]);
  console.log(isLoggedIn);

  return (
    <React.Fragment>
      {isLoading && !error && !isLoggedIn && (
        <p className={classes.loading}>Loading...</p>
      )}
      {error && (
        <div className={classes.errorDiv}>
          <p className={classes.error}>{error}</p>
          <button onClick={() => window.location.reload(true)}>
            Try again
          </button>
        </div>
      )}
      {!isLoading && !error && !isLoggedIn && <Login />}
      {isLoggedIn && (
        <section className={classes.entireWrapper}>
          <Current />
          <div className={classes.mainGrid}>
            <Movements />
            <Transfer />
            <Loan />
            <Close />
          </div>
        </section>
      )}
    </React.Fragment>
  );
}

export default App;
