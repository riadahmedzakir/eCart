import React from "react";
import { Menu, Search } from "semantic-ui-react";

class Navigation extends React.Component {
    render() {
        return (
            <Menu >
                <Menu.Item header>eCart</Menu.Item>

                <Search className="custom-navigation" />
                <Menu.Menu position='right'>
                    <Menu.Item>
                        <i aria-hidden="true" className="shopping cart icon"></i>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        )
    }
}

export default Navigation;