import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { useState } from "react";

export default function PasswordField({ value, setValue }) {

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <FormControl required>
      <InputLabel htmlFor="outlined-adornment-password" >كلمة المرور</InputLabel>
      <OutlinedInput

        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        id="outlined-adornment-password"
        type={showPassword ? 'text' : 'password'}

        endAdornment={
          <InputAdornment position="end"
          >
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="كلمة المرور"
      />
    </FormControl>
  )
}
