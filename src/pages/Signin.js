    import React from "react";
    import { Menu, Form, Container, Message, Button, Icon } from "semantic-ui-react"
    import { useHistory } from "react-router-dom";
    import firebase from "../utils/firebase";
    import "firebase/compat/auth"
        
    function Signin(){
        const history = useHistory();//轉址功能
        const [isLoading, setIsloding] = React.useState(false); //等待轉圈效果控制


        const [activeItem, setActiveItem] = React.useState("signin");//按鈕選擇控制
        const [email, setEmail] = React.useState("");
        const [password, setPassword] = React.useState("");  
        const [errorMessage, setErrorMessage] = React.useState("");  
        
        function onGoogleSubmit() {
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider)
                .then( () =>{
                    history.push("/posts");

                })
                .catch((error) => {
                    console.log(error);
                })

        }    

        function onSubmit() {
            setIsloding(true);
            if (activeItem === "register") {
                firebase.auth().createUserWithEmailAndPassword(email,password)
                               .then( () => {
                                                history.push("/posts");//轉址到文章發表瀏覽
                                                setIsloding(false);
                                             })
                               .catch((error) => {
                                    switch (error.code) {
                                        case 'auth/email-already-in-use':
                                            setErrorMessage('信箱已存在，不可重複');
                                            break;
                                        case 'auth/invalid-email':
                                            setErrorMessage('信箱格式不正確');
                                            break;
                                        case 'auth/weak-password':
                                            setErrorMessage('密碼強度不足');
                                            break;    
                                            default:
                                    }
                                    setIsloding(false);

                               });
            }else if(activeItem === "signin") {
                firebase.auth().signInWithEmailAndPassword(email,password)
                               .then( () => {
                                                history.push("/posts");
                                                setIsloding(false);
                                            }) 
                                .catch((error) => {
                                    switch (error.code) {
                                        case 'auth/invalid-email':
                                            setErrorMessage('信箱格式不正確');
                                            break;
                                        case 'auth/user-not-found':
                                            setErrorMessage('信箱不存在');
                                            break;
                                        case 'auth/wrong-password':
                                            setErrorMessage('密碼錯誤');
                                            break;    
                                            default:
                                    }
                                    setIsloding(false);

                                });
            }
        }


        return (
                <Container>
                    <Form onSubmit={onGoogleSubmit}>

                        <Button color='google' size='large'>
                            <Icon name='google' />
                            使用 Google 登入
                        </Button>

                    </Form>
                    
                    <Menu widths={"2"} size="large">
                        <Menu.Item 
                        active={activeItem === "register"} 
                        onClick={ () => {
                            setErrorMessage("");
                            setActiveItem("register");
                        }}
                        >註冊新帳號
                        </Menu.Item>
                        <Menu.Item 
                        active={activeItem === "signin"} 
                        onClick={ () => {
                            setErrorMessage("");
                            setActiveItem("signin");
                        }}
                        >登入
                        </Menu.Item>
                    </Menu>
                    <Form onSubmit={onSubmit}>
                        <Form.Input label="信箱" 
                                    value={email} 
                                    onChange = { (e) => setEmail(e.target.value)}
                                    placeholder="請輸入信箱" />
                        <Form.Input label="密碼" 
                                    value={password} 
                                    onChange = { (e) => setPassword(e.target.value)}
                                    placeholder="請輸入密碼" />
                        
                        {errorMessage && <Message negative>{errorMessage}</Message>}
                        <Form.Button loading = {isLoading}>
                            {activeItem === "register" && "註冊"}
                            {activeItem === "signin" && "登入"}
                        </Form.Button>
                    </Form>
                    
                    
                </Container>
        );    
    }

    export default Signin;