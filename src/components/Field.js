import { TextField } from "@mui/material";

export default function Field({ value, setValue, label, type }) {
  return (
    <>
      <TextField
        required
        id="outlined-basic"
        type={type}
        label={label}
        variant="outlined"
        value={value}
        className="input-div"
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </>
  );
}
