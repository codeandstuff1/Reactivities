import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

export const NavBar: React.FC = () => {
	return (
		<Menu fixed="top" inverted>
			<Container>
				<Menu.Item header exact as={NavLink} to="/">
					<img
						src="/assets/logo.png"
						alt="logo"
						style={{ marginRight: "10px" }}
					/>
					Reactivities
				</Menu.Item>
				<Menu.Item name="Activities" as={NavLink} to="/activities" />
				<Menu.Item>
					<Button
						as={NavLink}
						to="/createactivity"
						positive
						content="Create Activities"
					/>
				</Menu.Item>
			</Container>
		</Menu>
	);
};
