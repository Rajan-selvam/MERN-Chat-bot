import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IoIosLogIn } from "react-icons/io";
import { toast } from "react-hot-toast";
import CInput from "../components/shared/CustomizedInput";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const auth = useAuth();
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    // console.log(email, password, "---> email, password <---");
    try {
      toast.loading("Signing In!", { id: "sign-in" });
      await auth?.login(email, password);
      toast.success("Signed In!", { id: "sign-in" });
    } catch (error) {
      console.log(error);
      toast.error("Signing In Failed", { id: "sign-in" })
    }
  };
  return (
    <Box width={"100%"} height={"100%"} display="flex" flex={1}>
      <Box
        padding={8}
        margin={2}
        marginX={4}
        display={{ md: "flex", sm: "none", xs: "none" }}
      >
        <img src="airobot.png" alt="Robot" style={{ width: "300px" }} />
      </Box>
      <Box
        display={"flex"}
        flex={{ xs: 1, md: 0.5 }}
        justifyContent={"center"}
        alignItems={"center"}
        padding={2}
        ml={"auto"}
        mr={"auto"}
        // mt={2}
      >
        <form
          onSubmit={submitHandler}
          style={{
            margin: "auto",
            padding: "30px",
            boxShadow: "10px 10px 20px #000",
            borderRadius: "10px",
            border: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h4"
              textAlign="center"
              padding={2}
              fontWeight={600}
            >
              Login
            </Typography>
            <CInput label="Email" type="email" name="email" />
            <CInput label="Password" type="password" name="password" />
            <Button
              type="submit"
              sx={{
                px: 2,
                py: 1,
                mt: 2,
                width: "400px",
                color: "black",
                borderRadius: 2,
                bgcolor: "#00fffc",
                ":hover": {
                  bgcolor: "white",
                  color: "black",
                },
              }}
              endIcon={<IoIosLogIn />}
            >
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
