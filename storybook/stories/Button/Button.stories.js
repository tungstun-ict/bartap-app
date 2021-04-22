import { storiesOf } from "@storybook/react-native";
import React from "react";
import BarTapButton from "../../../src/component/BarTapButton";
import CenterView from "../CenterView";

storiesOf("BarTap Button", module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add("with text", () => (
    <BarTapButton text={"Example text"} onPress={() => alert("done")} />
  ));
