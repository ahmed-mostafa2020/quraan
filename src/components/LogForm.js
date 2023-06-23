import { Box } from "@mui/material";
import { useState } from "react";
import Field from "./Field";
import PasswordField from "./PasswordField";
import FormSubmitButton from "./FormSubmitButton";
import { API_URLS } from "../util/API_URLS";
import { GetApi } from "./GetApi";
import { useRouter } from "next/router";
import { Alert } from "react-bootstrap";

export default function LogForm() {
  let router = useRouter();
  // condition base redirecting
  function redirect(page) {
    router.push(page);
  }

  const [passValue, setPassValue] = useState("");
  const [mobileValue, setMobileValue] = useState("");

  // Labels errors
  const [mobileError, setMobileError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  //  messages
  const [msg, setMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);

  const dataArray = JSON.stringify({
    mobile: mobileValue,
    password: passValue,
  });
  API_URLS.HEADERPOST.body = dataArray;

  const sendReq = async () => {
    // release labels values and error messages from previous submission.
    setMobileError("");
    setPasswordError("");
    setMsg("");
    setSuccessMsg(false);
    setErrorMsg(false);

    const data = await GetApi(API_URLS.LOGIN, API_URLS.HEADERPOST);

    const message = data.message;
    setMsg(message);
    if (data.code == 200) {
      localStorage.setItem("token", data.data.token);
      setSuccessMsg(true);
      setTimeout(() => {
        redirect("/");
      }, 1500);
    }

    if (data.code != 200) {
      setErrorMsg(true);

      const errorLabels = data.data.validation_errors;
      if (errorLabels) {
        setMobileError(errorLabels.mobile);
        setPasswordError(errorLabels.password);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    sendReq();
  };

  return (
    <>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        className="log-form"
      >
        {successMsg ? (
          <Alert variant="success" className="mb-0 text-center">
            {msg}
          </Alert>
        ) : null}

        {errorMsg ? (
          <Alert variant="danger" className="mb-0 text-center">
            {msg}
          </Alert>
        ) : null}
        <Field
          type={"number"}
          value={mobileValue}
          setValue={setMobileValue}
          label={"رقم المحمول"}
        />
        {mobileError && <label className="error">{mobileError}</label>}

        <PasswordField value={passValue} setValue={setPassValue} />
        {passwordError && <label className="error">{passwordError}</label>}

        <FormSubmitButton>تسجيل الدخول</FormSubmitButton>
      </Box>
    </>
  );
}
