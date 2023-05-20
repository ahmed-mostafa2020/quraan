import * as React from 'react';
import Button from '@mui/material/Button';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { useState } from 'react';

function MyApp() {
  const [send, setSend] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariant = (variant) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar('! تم إرسال الإجابات بنجاح ', { variant });
    setSend(true)
  };

  return (
    <>
      <Button type='submit' onClick={handleClickVariant('success')}  className='btn'>ارسل</Button>
    </>
  );
}

export default function QuesSubmitButton() {
  return (
    <SnackbarProvider maxSnack={1}>
      <MyApp />
    </SnackbarProvider>
  );
}