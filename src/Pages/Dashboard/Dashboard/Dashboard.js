import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Button from '@mui/material/Button';
import { Route, useHistory, useRouteMatch } from 'react-router';
import DashboardHome from '../DashboardHome/DashboardHome';
import { Link, NavLink, Switch } from 'react-router-dom';
import MyOrders from '../MyOrders/MyOrders';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PaymentIcon from '@mui/icons-material/Payment';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import RateReviewIcon from '@mui/icons-material/RateReview';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useAuth from '../../../Hooks/useAuth';
import ManageOrders from '../AdminPanel/ManageOrders/ManageOrders';
import MakeAdmin from '../AdminPanel/MakeAdmin/MakeAdmin';
import AddProducts from '../AdminPanel/AddProducts/AddProducts';
import ManageProducts from '../AdminPanel/ManageProducts/ManageProducts';
import MakePayment from '../MakePayment/MakePayment';
import Review from '../Review/Review';
import AdminRoute from '../../Shared/AdminRoute/AdminRoute';

const drawerWidth = 260;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);
const Dashboard = () => {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);



    const history = useHistory()
    const { logout, admin } = useAuth()



    console.log(admin)
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    let { path, url } = useRouteMatch();

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />

                <List>
                    {['DashboardHome', 'My Orders', 'Make Payment', 'Review', "Manage Products", "Go Back", "Log Out"].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>
                                {index === 0 && <NavLink to={`${url}`}> <DashboardIcon /></NavLink>}
                                {index === 1 && <NavLink to={admin === true ? `${url}/manageorders` : `${url}/myorders`}> <BorderColorIcon /></NavLink>}
                                {index === 2 && <NavLink to={admin === true ? `${url}/makeadmin` : `${url}/makepayment`}> <PaymentIcon /></NavLink>}
                                {index === 3 && <NavLink to={admin === true ? `${url}/addproducts` : `${url}/review`}><RateReviewIcon /></NavLink>}
                                {index === 4 && admin === true && <NavLink to={`${url}/manageproducts`}><RateReviewIcon /></NavLink>}
                                {index === 5 && <IconButton onClick={() => { history.replace("/") }} color="secondary" sx={{ paddingLeft: "0" }}><ArrowBackIcon /></IconButton>}
                                {index === 6 && <IconButton onClick={logout} sx={{ paddingLeft: "4px" }} variant="text"><LogoutIcon /></IconButton>}
                            </ListItemIcon>
                            {index === 0 && <Link style={{ textDecoration: "none", color: "black" }} to={`${url}`}><Button color="inherit">{text}</Button></Link>}
                            {index === 1 && <Link style={{ textDecoration: "none", color: "black" }} to={admin === true ? `${url}/manageorders` : `${url}/myorders`}><Button color="inherit">{admin === true ? "Manage All Orders" : `${text}`}</Button></Link>}
                            {index === 2 && <Link style={{ textDecoration: "none", color: "black" }} to={admin === true ? `${url}/makeadmin` : `${url}/makepayment`}><Button color="inherit">{admin === true ? "Make An Admin" : `${text}`}</Button></Link>}
                            {index === 3 && <Link style={{ textDecoration: "none", color: "black" }} to={admin === true ? `${url}/addproducts` : `${url}/review`}><Button color="inherit">{admin === true ? "Add A Product" : `${text}`}</Button></Link>}
                            {index === 4 && <Box>
                                {
                                    admin === true && <Link style={{ textDecoration: "none", color: "black" }} to={`${url}/manageproducts`}><Button color="inherit">{text}</Button></Link>
                                }
                            </Box>}
                            {index === 5 && <Button onClick={() => { history.replace("/") }} color="inherit">{text}</Button>}
                            {index === 6 && <Button onClick={logout} color="inherit">{text}</Button>}
                        </ListItem>
                    ))}


                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, width: "90%" }}>
                <DrawerHeader />
                <Switch>
                    <Route exact path={path}>
                        <DashboardHome />
                    </Route>
                    <Route path={`${path}/myorders`}>
                        <MyOrders />
                    </Route>
                    <Route path={`${path}/makepayment`}>
                        <MakePayment />
                    </Route>
                    <Route path={`${path}/review`}>
                        <Review />
                    </Route>
                    <AdminRoute path={`${path}/makeadmin`}>
                        <MakeAdmin />
                    </AdminRoute>
                    <AdminRoute path={`${path}/manageorders`}>
                        <ManageOrders />
                    </AdminRoute>
                    <AdminRoute path={`${path}/addproducts`}>
                        <AddProducts />
                    </AdminRoute>
                    <AdminRoute path={`${path}/manageproducts`}>
                        <ManageProducts />
                    </AdminRoute>
                </Switch>

            </Box>
        </Box>
    );
}
export default Dashboard;