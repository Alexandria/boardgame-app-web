import React from "react"
import { TextField, Grid, Button, createStyles } from "@material-ui/core"
import { ErrorMessage, FormikProps, withFormik, FormikValues } from "formik"
import * as yup from "yup"
import axios from "axios"
import { setAuthorization } from "../../utils/setAuthorization"
import { withRouter, RouteComponentProps } from "react-router-dom"

const styles = createStyles({
  form: {
    display: "flex",
    minHeight: "100vh",
  },
  grid: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    color: "red",
  },
})

interface FormValues {
  email: string
  password: string
  showSnack: boolean
}

const FormComp = (props: FormikProps<FormValues>) => {
  const { values, handleChange, handleBlur, isSubmitting, handleSubmit } = props
  return (
    <div>
      <form onSubmit={handleSubmit} style={styles.form}>
        <Grid container spacing={8} style={styles.grid} direction="column">
          <Grid item>
            <TextField
              name="email"
              placeholder="Email"
              type="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <ErrorMessage name="email" />
          </Grid>
          <Grid item>
            <TextField
              name="password"
              placeholder="Password"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              variant="outlined"
            />
          </Grid>

          <Grid item>
            <ErrorMessage name="password" />
          </Grid>
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              size="small"
              disabled={isSubmitting}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

const LoginComponent = withFormik<RouteComponentProps, FormValues>({
  mapPropsToValues: () => ({
    email: "",
    password: "",
    showSnack: false,
  }),

  validationSchema: yup.object().shape({
    email: yup
      .string()
      .required("You must enter an email")
      .email(),
    password: yup.string().required("You must enter a  password"),
  }),

  handleSubmit(
    { email, password }: FormikValues,
    { setSubmitting, props, resetForm },
  ) {
    axios
      .post("http://localhost:5002/auth/login", {
        email,
        password,
      })
      .then(res => {
        const token = res.data.token
        if (token) {
          localStorage.setItem("jwtToken", token)
          setAuthorization(token)
          props.history.push(`/home/${res.data.userId}`)
          //tell user that they logged in successfully
        }
        setSubmitting(false)
      })
      .catch((err: { response: { data: { message: string } } }) => {
        // tell user that they failed to login
        if (err.response.data === undefined) {
          alert(JSON.stringify("Check to make sure your server is running"))
          props.history.push("/home/")
        }
        alert(JSON.stringify(err.response.data.message))
        console.log(err.response.data.message)
        resetForm()
        setSubmitting(false)
      })
  },
})(FormComp)

export const Login = withRouter(LoginComponent)

Login.displayName = "Login"
