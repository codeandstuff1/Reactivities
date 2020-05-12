import React, { useContext } from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import ActivityStore from '../../app/store/activityStore';

export const NavBar:React.FC = () => {
    const activityStore = useContext(ActivityStore);
    return (
        <Menu fixed="top" inverted>
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>
                    Reactivities
                </Menu.Item>
                <Menu.Item name="Activities"/>
                <Menu.Item>
                    <Button onClick={activityStore.openCreateForm} positive content="Create Activities"/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}
