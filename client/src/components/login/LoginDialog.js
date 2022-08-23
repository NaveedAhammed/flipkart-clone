import styled from "@emotion/styled";
import { Box, Button, Dialog, TextField, Typography } from "@mui/material";
import { useState } from "react";
import useInput from "./useInput";

import CircularProgress from '@mui/material/CircularProgress';
import { signIn, signUp } from "../../service/api";
import { useDispatch, useSelector } from "react-redux";
import Alert from '@mui/material/Alert';
import { login, register } from "../../redux/userRedux";


const Container = styled(Box)`
	height: 70vh;
	width: 90vh;
`;

const Image = styled(Box)`
	background: #2874f0
		url("https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png")
		center 85% no-repeat;
	width: 32%;
	padding: 45px 35px;
	color: white;
	font-weight: 600;
`;

const Wrapper = styled(Box)`
	display: flex;
	height: 100%;
`;

const FormSection = styled(Box)`
	display: flex;
	flex-direction: column;
	padding: 25px 35px;
	flex: 1;
	& > div,
	& > p,
	& > button {
		margin-top: 20px;
	}
`;

const ButtonType1 = styled(Button)`
	text-transform: none;
	background-color: #fb641b;
	color: white;
	height: 48px;
	border-radius: 2px;
	&:hover {
		background-color: #fb641b;
		color: white;
	}
`;

const ButtonType2 = styled(Button)`
	text-transform: none;
	background-color: #fff;
	color: #2874f0;
	height: 48px;
	border-radius: 2px;
	box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%);
	&:hover {
		background-color: #fff;
		color: #2874f0;
	}
`;

const PolicyText = styled(Typography)`
	font-size: 12px;
	color: #878787;
`;

const CreateAccount = styled(Typography)`
	font-size: 14px;
	text-align: center;
	color: #2874f0;
	cursor: pointer;
	font-weight: 600;
`;

const Input = styled(TextField)`
	border-bottom-color: rgb(224, 224, 224);
	border-bottom-style: solid;
	border-bottom-width: 0px;
`;

const SpanText = styled(Box)`
	color: #2874f0;
	display: inline-block;
	cursor: pointer;
`;

const ErrorText = styled(Box)`
  font-size: 12px;
  color: red;
  width: 100%;
  margin-top: 2px;
`;

const LoginDialog = ({ open, setOpen }) => {
  const [authType, setAuthType] = useState(true);
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.fetch);
  const [showError, setShowError] = useState(null);


  const {
    value: enteredUsername,
    hasError: usernameInputHasError,
    valueChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
    reset: resetUsernameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredPassword,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.includes('@'));

  const inputsResetHandler = () => {
    resetUsernameInput();
    resetPasswordInput();
    resetEmailInput();
  }

  const closeHandler = () => {
    setOpen((prev) => !prev);
    setAuthType(true);
    inputsResetHandler();
  };

  const toggleAuthHandler = () => {
    setAuthType((prev) => !prev);
    inputsResetHandler();
  };

  const errorShowHandler = (err) => {
    setShowError(err);
    setTimeout(function () {
      setShowError(null);
    }, 2000)
  }

  const registerSubmitHandler = async (event) => {
    event.preventDefault();
    if (usernameInputHasError || passwordInputHasError || emailInputHasError || !enteredEmail || !enteredPassword || !enteredUsername) {
      return;
    }
    const data = {
      username: enteredUsername,
      email: enteredEmail,
      password: enteredPassword
    }
    const res = await signUp(dispatch, data);
    if (res.data) {
      console.log(res.data);
      dispatch(register({ user: res.data }));
      setOpen(false);
      inputsResetHandler();
    } else {
      errorShowHandler(res.error);
    }
  }

  const loginSubmitHandler = async (event) => {
    event.preventDefault();
    if (usernameInputHasError || passwordInputHasError || !enteredPassword || !enteredUsername) {
      return;
    }
    const data = {
      username: enteredUsername,
      password: enteredPassword
    }
    const res = await signIn(dispatch, data);
    if (res.data) {
      dispatch(login({ user: res.data }));
      setOpen(false);
      inputsResetHandler();
    } else {
      errorShowHandler(res.error);
    }
  }

  const LoginField = (
    <FormSection>
      <Input
        error={usernameInputHasError}
        variant="standard"
        label="Enter Username"
        type="text"
        onChange={usernameChangeHandler}
        value={enteredUsername}
        onBlur={usernameBlurHandler}
      />
      {usernameInputHasError && <ErrorText component={'span'}>Please enter valid username</ErrorText>}
      <Input
        variant="standard"
        label="Enter Password"
        type="password"
        value={enteredPassword}
        onChange={passwordChangeHandler}
        onBlur={passwordBlurHandler}
        error={passwordInputHasError}
      />
      {passwordInputHasError && <ErrorText component={'span'}>Please enter password</ErrorText>}
      <PolicyText>
        By continuing, you agree to Flipkart's <SpanText component={"span"}>Terms of Use</SpanText> and <SpanText
          component={"span"}
          style={{ color: "#2874f0", display: "inline-block" }}
        >
          Privacy Policy
        </SpanText>
        .
      </PolicyText>
      <ButtonType1 onClick={loginSubmitHandler}>{loading && <CircularProgress size='1.5rem' style={{ color: 'white', marginRight: 10 }} />}Login</ButtonType1>
      <CreateAccount onClick={toggleAuthHandler}>
        New to Flipkart? Create an account
      </CreateAccount>
    </FormSection>
  );

  const RegisterField = (
    <FormSection>
      <Input
        error={usernameInputHasError}
        variant="standard"
        label="Enter Username"
        type="text"
        onChange={usernameChangeHandler}
        value={enteredUsername}
        onBlur={usernameBlurHandler}
      />
      {usernameInputHasError && <ErrorText component={'span'}>Please enter valid username</ErrorText>}
      <Input
        variant="standard"
        label="Enter Email"
        type="email"
        value={enteredEmail}
        onChange={emailChangeHandler}
        onBlur={emailBlurHandler}
        error={emailInputHasError}
      />
      {emailInputHasError && <ErrorText component={'span'}>Please enter valid email</ErrorText>}
      <Input
        variant="standard"
        label="Enter Password"
        type="password"
        value={enteredPassword}
        onChange={passwordChangeHandler}
        onBlur={passwordBlurHandler}
        error={passwordInputHasError}
      />
      {passwordInputHasError && <ErrorText component={'span'}>Please enter password</ErrorText>}
      <PolicyText>
        By continuing, you agree to Flipkart's{" "}
        <SpanText component={"span"}>Terms of Use</SpanText> and{" "}
        <SpanText
          component={"span"}
          style={{ color: "#2874f0", display: "inline-block" }}
        >
          Privacy Policy
        </SpanText>
        .
      </PolicyText>
      <ButtonType1 onClick={registerSubmitHandler}>{loading && <CircularProgress size='1.5rem' style={{ color: 'white', marginRight: 10 }} />} Register</ButtonType1>
      <ButtonType2 onClick={toggleAuthHandler}>
        Existing User? Log in
      </ButtonType2>
    </FormSection>
  );

  const ImageText = authType
    ? "Get access to your Orders, Wishlist and Recommendations"
    : "Sign up to get started";

  return (
    <Dialog
      open={open}
      onClose={closeHandler}
      PaperProps={{ sx: { maxWidth: "unset" } }}
    >
      {showError !== null && <Alert style={{ transition: 'all 0.3s ease' }} severity="info">{showError}</Alert>}
      <Container>
        <Wrapper>
          <Image>
            <Typography
              variant="h5"
              style={{ fontSize: 28, fontWeight: 500 }}
            >
              {authType
                ? "Login"
                : "Look's like you're new here!"}
            </Typography>
            <Typography
              style={{
                marginTop: 20,
                fontSize: 18,
                color: "#dbdbdb",
              }}
            >
              {ImageText}
            </Typography>
          </Image>
          {authType ? LoginField : RegisterField}
        </Wrapper>
      </Container>
    </Dialog>
  );
};

export default LoginDialog;
