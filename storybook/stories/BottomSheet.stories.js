import { storiesOf } from "@storybook/react-native";
import React from "react";
import BarTapBottomSheet from "../../src/component/BarTapBottomSheet";
import CenterView from "../../src/component/CenterView";
import { colors } from "../../src/theme/variables";

storiesOf("BarTap Bottomsheet", module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add("standard", () => (
    <BarTapBottomSheet height={450} />
  ));
