import { storiesOf } from "@storybook/react-native";
import React from "react";
import BarTapButton from "../../src/component/BarTapButton";
import CenterView from "../../src/component/CenterView";
import { colors } from "../../src/theme/variables";

storiesOf("BarTap Button", module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add("with text", () => (
    <BarTapButton text={"Example text"} onPress={() => alert("done")} />
  ))
  .add("with custom colors", () => (
    <BarTapButton
      text={"Example text"}
      colour={darkTheme.BARTAP_RED}
      textColour={darkTheme.BARTAP_WHITE}
      onPress={() => alert("done")}
    />
  ));
