import RadioButtonsGroup from '../components/RadioButtonsGroup';
import QuesSubmitButton from '../components/QuesSubmitButton';
import { Box } from "@mui/material";
import { API_URLS } from "../util/API_URLS";
import { GetApi } from "../components/GetApi";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Helmet from "@/helpers/Helmet";
import CircularProgress from '@mui/material/CircularProgress';


export default function Home() {
  // redirect
  let router = useRouter();
  function redirect(page) {
    router.push(page);
  }


  const [dataFetched, setDataFetched] = useState('');

  //reading , question number & answers state
  const [question1, setQuestion1] = useState('');
  const [question2, setQuestion2] = useState('');
  const [answer1, setAnswer1] = useState('');
  const [answer2, setAnswer2] = useState('');
  const [reading, setReading] = useState(false);
  let answers = { 'reading': reading, 'question1': question1, 'answer1': answer1, 'question2': question2, 'answer2': answer2 };

  // after send answers message
  const [message, setMessage] = useState('');
  const [show, setShow] = useState(false);

  const sendReq = async () => {
    const token = "Bearer " + localStorage.getItem('token');
    API_URLS.HEADERGET.headers.Authorization = token;

    const data = await GetApi(API_URLS.HOME, API_URLS.HEADERGET);
    setDataFetched(data);
    if (data.code === 401) {
      // condition base redirecting
      redirect("/result");
    }
    if (data.code === 301) {
      localStorage.removeItem('token');
      redirect("/login");
    }
  }
  useEffect(() => {
    sendReq();
  }, []);

  const sendAnswer = async () => {
    setMessage('');

    const token = "Bearer " + localStorage.getItem('token');
    API_URLS.HEADERPOST.headers.Authorization = token;
    API_URLS.HEADERPOST.body = JSON.stringify(answers);
    const data = await GetApi(API_URLS.ANSWER, API_URLS.HEADERPOST);

    if (data.code === 401 || data.code === 200) {
      // condition base redirecting
      redirect("/result");
    }

    if (data.code === 400) {
      setShow(true);
      setMessage(data.message);
    }

    if (data.code == 301) {
      localStorage.removeItem("token");
      redirect('/login');
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    sendAnswer();
  };


  return (

    <>
      <Helmet title={'الأسئلة'} ></Helmet>
      <main className='main'>
        <div className='container'>
          <div className='validation-error'>
            <h3> {setShow && (<label className="error">{message }</label> ) }</h3>
          </div>

          {dataFetched ? <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
            method="POST"
            id='form1'
          >
            <div className="box input-group mb-3">
              <div className="input-group-text">
                <input className="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input"
                  onChange={() => { setReading(!reading) }} />
              </div>
              <input type="text" disabled value="أتممت بفضل الله ورد اليوم " className="form-control" aria-label="Text input with checkbox" />
            </div>

            <div className='wrap'>
              <RadioButtonsGroup data={dataFetched} setAnswer1={setAnswer1} setAnswer2={setAnswer2} setQuestion1={setQuestion1} setQuestion2={setQuestion2} />
            </div>
            <button type='submit' className='btn'>ارسل </button>
            {/* <QuesSubmitButton /> */}
          </Box> : <Box sx={{ display: 'flex' , marginTop: '100px', justifyContent: 'center'}}>
            <CircularProgress  sx={{color : '#004243 '}}/>
          </Box>}

        </div>
      </main>
    </>
  )
}
