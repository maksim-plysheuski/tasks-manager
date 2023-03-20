import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Menu } from '@mui/icons-material';
import React, {useCallback} from "react"
import { TodolistsList } from '../features/TodolistsList/TodolistsList';
import {useAppSelector} from "./store";
import { RequestStatusType } from './app-reducer';
import { LinearProgress } from '@mui/material';


function App() {
    const status = useAppSelector<RequestStatusType>(state => state.app.status)

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            {status === 'loading' && <LinearProgress color="primary" />}
            <Container fixed>
                <TodolistsList/>
            </Container>
        </div>
    );
}

export default App;
