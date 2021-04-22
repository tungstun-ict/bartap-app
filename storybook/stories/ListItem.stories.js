import { storiesOf } from "@storybook/react-native";
import React from "react";
import BarTapButton from "../../src/component/BarTapButton";
import BarTapListItem from "../../src/component/BarTapListItem";
import CenterView from "../../src/component/CenterView";
import { colors } from "../../src/theme/variables";

storiesOf("BarTap ListItem", module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add("with name and button", () => (
    <BarTapListItem  name={"This is a name"} onPress={() => alert("done")} />
  ))
  .add("with most values", () => (
    <BarTapListItem  name={"This is a name"} multiplier={2} price={(2).toFixed(2)} onPress={() => alert("done")} />
  ));
