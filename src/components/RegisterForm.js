import { Box } from "@mui/material";
import { useState } from "react";
import Field from "./Field";
import PasswordField from "./PasswordField";
import FormSubmitButton from "./FormSubmitButton";
import { API_URLS } from "../util/API_URLS";
import { GetApi } from "./GetApi";
import { useRouter } from "next/router";
import { Alert } from "react-bootstrap";

export default function RegisterForm() {
  let router = useRouter();
  // condition base redirecting
  function redirect(page) {
    router.push(page);
  }
  const [status, setStatus] = useState(false);

  // inputs values
  const [nameValue, setNameValue] = useState("");
  const [mobileValue, setMobileValue] = useState("");
  const [passValue, setPassValue] = useState("");

  // Labels errors
  const [nameError, setNameError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  //  messages
  const [msg, setMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);

  const dataArray = JSON.stringify({
    name: nameValue,
    mobile: mobileValue,
    password: passValue,
  });
  API_URLS.HEADERPOST.body = dataArray;

  const sendReq = async () => {
    // release labels values from previous submission .
    setNameError("");
    setMobileError("");
    setPasswordError("");
    setMsg("");
    setSuccessMsg(false);
    setErrorMsg(false);
    const data = await GetApi(API_URLS.REGISTER, API_URLS.HEADERPOST);
    const message = data.message;
    setMsg(message);

    if (data.code == 200) {
      setSuccessMsg(true);
      setStatus(true);
      setTimeout(() => {
        redirect("/login");
      }, 1500);
    }
    if (data.code != 200) {
      setErrorMsg(true);

      const errorLabels = data.data.validation_errors;
      if (errorLabels) {
        setNameError(errorLabels.name);
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
        method="POST"
      >
        {successMsg && <label className="success-msg">{msg}</label>}
        {errorMsg && <label className="error-msg">{msg}</label>}
        <Field value={nameValue} setValue={setNameValue} label={"الاسم"} />
        {nameError && <label className="error">{nameError}</label>}

        <Field
          type={"number"}
          value={mobileValue}
          setValue={setMobileValue}
          label={"رقم المحمول"}
        />
        {mobileError && <label className="error">{mobileError}</label>}

        <PasswordField value={passValue} setValue={setPassValue} />
        {passwordError && <label className="error">{passwordError}</label>}

        <FormSubmitButton>إنشاء حساب</FormSubmitButton>
        {status ? (
          <Alert variant="success" className="mt-3 text-center">
            {"تم إنشاء الحساب بنجاح"}
          </Alert>
        ) : null}
      </Box>
    </>
  );
}
