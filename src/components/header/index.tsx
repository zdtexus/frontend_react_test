import { useContext } from 'react';
import { ThemeContext } from '../theme-provider';
import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react';
import { LuMoon, LuSunMedium } from 'react-icons/lu';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logout, selectIsAuthenticated } from '../../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { CiLogout } from 'react-icons/ci';

export const Header = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('token');
        navigate('/auth');
    };

    return (
        <Navbar className='p-2 default-navbar'>
            <NavbarBrand>
                <p className="font-bold text-inherit">Network Social</p>
            </NavbarBrand>
            <NavbarContent justify='end'>
                <NavbarItem
                    className='lg:flex text-3xl cursor-pointer'
                    onClick={() => toggleTheme()}
                >
                    {theme === 'light' ? <LuMoon /> : <LuSunMedium />}
                </NavbarItem>
                <NavbarItem>
                    {
                    isAuthenticated && (
                        <Button
                        color='default'
                        variant='flat'
                        className="gap-2"
                        onClick={handleLogout}
                        >
                            <CiLogout className='text-xl'/> <span>Logout</span>
                        </Button>
                    )}
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
};
