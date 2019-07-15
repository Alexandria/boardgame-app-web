import { storiesOf } from "@storybook/react"
import React from "react"
import { decoratorCentered } from "../../utils/decoratorCentered"
import { BgCard } from "."
import { catan } from "./test"

storiesOf("BgCard", module)
  .addDecorator(decoratorCentered)
  .add("default", () => <BgCard boardgames={catan} />)
