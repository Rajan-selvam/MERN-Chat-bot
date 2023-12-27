import TextField from "@mui/material/TextField";

type Props = {
  name: string;
  type: string;
  label: string;
};

const CInput = ({ name, type, label }: Props) => {
  return (
    <TextField
      margin="normal"
      InputLabelProps={{ style: { color: "white" } }}
      name={name}
      label={label}
      type={type}
      InputProps={{
        style: {
          width: "400px",
          borderRadius: 10,
          fontSize: 16,
          color: "white",
        },
      }}
    />
  );
};

export default CInput;
