import React from "react";

import {action} from "@storybook/addon-actions";
import AppWithRedux from "./AppWithRedux";
import {ReduxStoreProviderDecorator} from "./stories/ReduxStoreProviderDecorator";


export default {
    title: 'AppWithRedux Component',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
}


const ValueCallback = action('Value changed')

export const AppWithReduxExample = () => {
    return <AppWithRedux/>
}

