import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Avatar, Button, Menu, MenuItem, Switch} from "@mui/material";
import {NavbarItem} from "./NavbarItem";
import {AccountBox, Add, Home, Logout, Search} from "@mui/icons-material";
import {useNavigate} from "react-router";
import {LogoutDialog} from "./LogoutDialog";

export const Navbar = ({changeTheme})=>{
    let navigate = useNavigate()

    const [username,setUsername] = useState(localStorage.getItem("username"))
    const [menuOpen,setMenuOpen] = useState(false)
    const [logoutOpen,setLogoutOpen] = useState(false)
    const [anchor,setAnchor] = useState(null)

    useEffect(()=>{
        const handleStorage = ()=>{
            setUsername(localStorage.getItem("username"))
            console.log(username)
        }
        window.addEventListener("storage",handleStorage)
        return ()=>{
            window.removeEventListener("storage",handleStorage)
        }
    },[])

    const changeLogoutOpen = ()=>{
        setLogoutOpen(!logoutOpen)
    }

    const changeMenuOpen = (event)=>{
        setAnchor(event.currentTarget)
        setMenuOpen(!menuOpen)
    }

    return (
        <div className="flex flex-row items-center shadow-[rgba(99,99,99,0.2)_0_2px_8px_0] bg-[#ede7f6]">
            <Link to="/home" className="basis-[10%] font-bold m-[10px] text-[36px] font-serif decoration-0">Bloggy</Link>
            <div className="flex flex-auto flex-row mx-[10px]">
                <NavbarItem to="/home" title="Home" icon={<Home/>} />
                <NavbarItem to="/search" title="Search" icon={<Search/>} />
                <NavbarItem to={`/${username ? "create" : "login"}`} title="Create" icon={<Add/>}/>
            </div>
            <Switch onChange={changeTheme} className="m-[10px]"/>
            {
                username ? (
                    <div>
                        <Button
                            onClick={changeMenuOpen}
                            style={{
                                display : "flex",
                                flexDirection : "row",
                                textTransform : "none",
                                justifyContent : "space-evenly",
                                borderRadius : "18px",
                                "&:hover" : {
                                    boxShadow : "rgba(60,64,67,0.3) 0 1px 2px 0,rgba(60,64,67,0.15) 0 2px 6px 2px"
                                }
                            }}
                        >
                            <div className="text-[18px] mx-[5px]">
                                {username}
                            </div>
                            <Avatar className="mx-[5px]" />
                        </Button>
                        <Menu
                            open={menuOpen}
                            onClose={changeMenuOpen}
                            anchorEl={anchor}
                        >
                            <MenuItem onClick={()=>{
                                setMenuOpen(false)
                                navigate(`/user/${username}`)
                            }}>
                                <AccountBox className="mr-[10px]"/> Profile
                            </MenuItem>
                            <MenuItem onClick={()=>{
                                setMenuOpen(false)
                                setLogoutOpen(true)
                            }}>
                                <Logout className="mr-[10px]"/> Logout
                            </MenuItem>
                        </Menu>
                        <LogoutDialog open={logoutOpen} setOpen={setLogoutOpen} />
                    </div>
                ) : (
                    <Link to={"/login"} className="font-bold text-[20px] my-[10px] mx-[20px] duration-[400ms] hover:opacity-[0.5]">
                        Login
                    </Link>
                )
            }
        </div>
    )
}