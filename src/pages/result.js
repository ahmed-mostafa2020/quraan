import Head from "next/head";
import { API_URLS } from "../util/API_URLS";
import { useEffect, useState } from "react";
import { GetApi } from "../components/GetApi";
import { useRouter } from "next/router";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function Result() {
  // redirect
  let router = useRouter();
  function redirect(page) {
    router.push(page);
  }
  const [dataFetched, setDataFetched] = useState('');

  const sendReq = async () => {
    const token = "Bearer " + localStorage.getItem('token');
    API_URLS.HEADERGET.headers.Authorization = token;

    const data = await GetApi(API_URLS.RESULT, API_URLS.HEADERGET);

    setDataFetched(data);
    console.log(data);

    if (data.code === 301) {
      localStorage.removeItem('token');
      redirect("/login");
    }
  }

  useEffect(() => {
    sendReq();
  }, []);

  return (
    <>
      <Head>
        <title>جروب القرءان الكريم|النتيجة</title>
        <meta name="description" content="جروب القراءن الكريم" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/blob14.svg" />
      </Head>

      <div className="result">
        <div className="container">
          <form>
            <div className="box">
              <div className="wrap">
                <FormControl className='radio-group'  >
                  <FormLabel id="َquestion1" >{dataFetched.data?.[0].title}</FormLabel>

                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                  >
                    {dataFetched.data?.[0].answers.map((answer, index) => {
                      return (
                        <FormControlLabel value={answer} control={<Radio />} label={answer} key={index}
                        />
                      )
                    })}
                  </RadioGroup>
                </FormControl>
                <FormControl className='radio-group'  >
                  <FormLabel id="َquestion1" >{dataFetched.data?.[1].title}</FormLabel>

                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                  >
                    {dataFetched.data?.[1].answers.map((answer, index) => {
                      return (
                        <FormControlLabel value={answer} control={<Radio />} label={answer} key={index}
                        />
                      )
                    })}
                  </RadioGroup>
                </FormControl>

                
              </div>
            </div>
          </form>
        </div>

      </div>


    </>
  )
}
