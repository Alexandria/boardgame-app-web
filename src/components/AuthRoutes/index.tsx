import React from "react"
import { Home } from "../Home"
import { Search } from "../Search"
import { Route, Redirect, RouteComponentProps, Switch } from "react-router-dom"

interface OtherProps {
  id: string
}

const home = ({ match }: RouteComponentProps<OtherProps>) => {
  console.log("Render home!")
  return <Home id={match.params.id} />
}

export function AuthRoutes() {
  return localStorage.jwtToken ? (
    <Switch>
      <Route path="/home/:id" render={home} />
      <Route path="/search" component={Search} />
    </Switch>
  ) : (
    <Redirect to="/login" />
  )
}