import { API_URLS } from "../util/API_URLS";
import { useEffect, useState } from "react";
import { GetApi } from "../components/GetApi";
import { useRouter } from "next/router";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Helmet from "@/helpers/Helmet";
import { Alert } from "react-bootstrap";
import { Box, CircularProgress } from "@mui/material";
import Link from "next/link";

export default function Result() {
  // redirect
  let router = useRouter();
  function redirect(page) {
    router.push(page);
  }

  const [dataFetched, setDataFetched] = useState("");

  const sendReq = async () => {
    const token = "Bearer " + localStorage.getItem("token");
    API_URLS.HEADERGET.headers.Authorization = token;

    const data = await GetApi(API_URLS.RESULT, API_URLS.HEADERGET);

    setDataFetched(data);
    console.log(data);
    if (data.code === 301) {
      localStorage.removeItem("token");
      <Alert variant="danger" className="mt-3  text-center">
        {data.message}
      </Alert>;
      setTimeout(() => {
        redirect("/login");
      }, 700);
    }

    if (data.code === 401) {
      <Alert variant="danger" className="mt-3  text-center">
        {data.message}
      </Alert>;
      setTimeout(() => {
        redirect("/login");
      }, 700);
    }
  };

  useEffect(() => {
    sendReq();
  }, []);

  return (
    <>
      <Helmet title={"النتيجة"} />

      {dataFetched.data ? (
        <div className="result">
          <div className="container">
            <form>
              <div className="box">
                <div className="wrap">
                  {dataFetched.data[0] ? (
                    <FormControl className="radio-group">
                      <FormLabel id="َquestion1">
                        {dataFetched.data[0].title}
                      </FormLabel>
                      {dataFetched.data[0].degree ? (
                        <Alert variant="success" className="mb-3  text-center">
                          {"إجابتك صحيحة"}
                        </Alert>
                      ) : (
                        <Alert variant="danger" className="mb-3  text-center">
                          {`إجابتك خاطئة والإجابة الصحيحة هى ${dataFetched.data[0].right_answer}`}
                        </Alert>
                      )}
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                      >
                        {dataFetched.data[0].answers.map((answer, index) => {
                          if (answer == dataFetched.data[0].his_answer) {
                            return (
                              <FormControlLabel
                                value={answer}
                                control={<Radio />}
                                label={answer}
                                key={index}
                                checked
                                className={
                                  dataFetched.data[0].degree
                                    ? "right_answer"
                                    : "wrong_answer "
                                }
                              />
                            );
                          } else if (
                            answer == dataFetched.data[0].right_answer
                          ) {
                            return (
                              <FormControlLabel
                                value={answer}
                                control={<Radio />}
                                label={answer}
                                key={index}
                                checked
                                className="right_answer"
                              />
                            );
                          } else {
                            return (
                              <FormControlLabel
                                value={answer}
                                control={<Radio />}
                                label={answer}
                                key={index}
                                disabled
                              />
                            );
                          }
                        })}
                      </RadioGroup>
                    </FormControl>
                  ) : (
                    ""
                  )}

                  {dataFetched.data[1] ? (
                    <FormControl className="radio-group">
                      <FormLabel id="َquestion2">
                        {dataFetched.data[1].title}
                      </FormLabel>
                      {dataFetched.data[1].degree ? (
                        <Alert variant="success" className="mb-3  text-center">
                          {"إجابتك صحيحة"}
                        </Alert>
                      ) : (
                        <Alert variant="danger" className="mb-3  text-center">
                          {`إجابتك خاطئة والإجابة الصحيحة هى ${dataFetched.data[1].right_answer}`}
                        </Alert>
                      )}
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label2"
                        name="radio-buttons-group2"
                      >
                        {dataFetched.data?.[1].answers.map((answer, index) => {
                          if (answer == dataFetched.data[1].his_answer) {
                            return (
                              <FormControlLabel
                                value={answer}
                                control={<Radio />}
                                label={answer}
                                key={index}
                                checked
                                className={
                                  dataFetched.data[1].degree
                                    ? "right_answer"
                                    : "wrong_answer "
                                }
                              />
                            );
                          } else if (
                            answer == dataFetched.data[1].right_answer
                          ) {
                            return (
                              <FormControlLabel
                                value={answer}
                                control={<Radio />}
                                label={answer}
                                key={index}
                                checked
                                className="right_answer"
                              />
                            );
                          } else {
                            return (
                              <FormControlLabel
                                value={answer}
                                control={<Radio />}
                                label={answer}
                                key={index}
                                disabled
                              />
                            );
                          }
                        })}
                      </RadioGroup>
                    </FormControl>
                  ) : (
                    ""
                  )}
                </div>

                <Link
                  href="https://chat.whatsapp.com/Hokw6zJMbIF9Z43SUYOZo6"
                  className="done"
                >
                  تم
                </Link>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <Box
          sx={{
            display: "flex",
            marginTop: "100px",
            justifyContent: "center",
          }}
        >
          <CircularProgress sx={{ color: "#004243 " }} />
        </Box>
      )}
    </>
  );
}
