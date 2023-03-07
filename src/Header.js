    import { Menu , Search } from "semantic-ui-react";

    import { Link } from "react-router-dom";
    import firebase from "./utils/firebase";
    import React from "react";
    

    function Header({ user }) {
        // const [user, setUser] = React.useState(null);
        // React.useEffect( () => {
        //     onAuthStateChanged(getAuth(), (currentuser) => {
        //          setUser(currentuser);
        //      });
        // } , []);
        //已經在 App.js 做監聽，並且用 props 將 { user } 傳入 Header.js


        return (
        <Menu  >
            <Menu.Menu position="left">
                <Menu.Item as={ Link } to="/posts" ><h1>社群空間</h1></Menu.Item>
                <Menu.Item as={ Link } to="/svc" ><h1>登記作業</h1></Menu.Item>
                <Menu.Item as={ Link } to="/shopping" ><h1>消費登記</h1></Menu.Item>

            </Menu.Menu>
            

            <Menu.Menu position="right">
                {user ? (
                    <>
                        <Menu.Item as={ Link } to="/new-post" >發表文章</Menu.Item>
                        <Menu.Item as={ Link } to="/my" >會員</Menu.Item>
                        <Menu.Item onClick={() => firebase.auth().signOut()  } as={ Link } to="/posts" >登出</Menu.Item>
                    </>
                ) : (
                    <Menu.Item as={ Link } to="/signin"  >註冊 / 登錄</Menu.Item>
                )}
            </Menu.Menu>
        </Menu>
        );
    }

    export default Header;