import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
  Avatar,
} from "@mui/material";
import img from "../resources/favicon.ico";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { API_URL } from "../const";

export default function Login() {
  //delcare
  const navigate = useNavigate();
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const [inputError, setInputError] = useState({
    reason: "",
    boolean: false,
  });

  //function
  const handleLogin = async (e) => {
    e.preventDefault();
    if (input.username.length !== 0 && input.password.length !== 0) {
      //Username = ABC password=ABC123
      if (input.password.includes(input.username)) {
        setInputError({
          reason: "Password contains email",
          boolean: true,
        });
      } else {
        const response = await fetch(API_URL + "/api/auth/login", {
          method:"POST",
          headers: {
            "Content-Type":"application/json",
          },
          body:JSON.stringify({
            Email_id: input.username, Password: input.password
          })
        });
        setInput({
          username: "",
          password: "",
        });
        const data = await response.json()
        if (response.status===200) {
          if(data.Is_admin) {
            navigate("/admin");
          } else {
            navigate("/Employees")
          }
        }
        else {
          alert(data.msg); 
        }
      }
    }

    //Username Length is Zero
    if (input.username.length === 0 || input.password.length === 0) {
      setInputError({
        reason: "Email or Password is Empty",
        boolean: true,
      });
    }
  };

  function handleInputChange(e) {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card sx={{ margin: 20, padding: 5 }}>
        <CardContent>
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Avatar src={img} sx={{ width: 80, height: 80 }} />
          </div>
          <Typography variant="h4" align="center" marginBottom={1}>
            Login
          </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <TextField
              id="outlined-required"
              label="Email_Id"
              required
              sx={{ margin: 2 }}
              onChange={handleInputChange}
              value={input.username}
              name="username"
              color={inputError.boolean ? "warning" : "primary"}
            />

            <TextField
              type="password"
              id="outlined-required"
              label="Password"
              required
              sx={{ marginTop: 2, mr: 2, ml: 2 }}
              onChange={handleInputChange}
              value={input.password}
              name="password"
              color={inputError.boolean ? "warning" : "primary"}
            />
          </div>
        </CardContent>
        <CardActions>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              onClick={handleLogin}
              sx={{ marginBottom: "10px" }}
            >
              Login
            </Button>
          </div>
        </CardActions>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            variant="text"
            onClick={() => {
              navigate("/signup");
            }}
            sx={{ color: "#0095F6" }}
          >
            Don't have an account? Sign up
          </Button>
        </div>

        {inputError.boolean && (
          <h6 style={{ color: "red", textAlign: "center" }}>
            {inputError.reason}
          </h6>
        )}
      </Card>
    </div>
  );
}
