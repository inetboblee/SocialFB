    import React from "react";
    import firebase from "./utils/firebase";
    import { BrowserRouter , Switch, Route, Redirect  } from "react-router-dom";
    import { Grid, Container } from "semantic-ui-react" 

    import Header from "./Header";
    import MyMenu from "./components/MyMenu";
    import Topics from "./components/Topics";
    import Signin from "./pages/Signin";
    import Post from "./pages/post";
    import Posts from "./pages/posts";
    import NewPost from "./pages/NewPost";
    import MyPosts from "./pages/MyPosts";
    import MyCollections from "./pages/MyCollections";
    import MySetting from "./pages/MySetting";
    import ServiceFor from "./pages/ServiceFor";
    import Shopping from "./pages/Shopping";
  
    
    


    function App() {
        const [user, setUser] = React.useState(null);
        
        React.useEffect(()=>{
            firebase.auth().onAuthStateChanged((currentUser)=>{
                setUser(currentUser)
            })
        }, [])

        return (
            <BrowserRouter>
                <Header user={ user } />
                <Switch>
                <Route path="/posts">
                    <Container>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={3}><h1>發表主題</h1><Topics/></Grid.Column>
                                <Grid.Column width={10}>
                                <Switch>
                                    <Route path="/posts" exact><Posts /></Route>
                                    <Route path="/posts/:postId" exact >
                                        { user ? <Post /> : <Redirect to="/posts" /> }  </Route>
                                </Switch>
                                </Grid.Column>
                                <Grid.Column width={3}></Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Container>
                </Route>

                
                 <Route path="/my">
                    {user 
                     ? 
                    <Container>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={3}><h1>會員選單</h1><MyMenu/></Grid.Column>
                                <Grid.Column width={10}>
                                <Switch>
                                    <Route path="/my/posts" exact > <MyPosts /> </Route> 
                                    <Route path="/my/collections" exact > <MyCollections /> </Route> 
                                    <Route path="/my/settings" exact > <MySetting user={ user }  /> </Route> 
                                </Switch>
                                </Grid.Column>
                                <Grid.Column width={3}></Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Container>
                    :
                    <Redirect to="/posts"  ></Redirect>
                    }
                </Route>
                
                    
                <Route path="/signin" exact > 
                { user ? <Redirect to="/posts" /> : <Signin /> } </Route> 
                <Route path="/new-post" exact > 
                { user ? <NewPost /> : <Redirect to = "/posts" /> } </Route> 
                <Route path="/svc" exact > 
                { user ? <ServiceFor /> : <Redirect to="/posts" />  } </Route> 
                <Route path="/shopping" exact > 
                { user ? <Shopping /> : <Redirect to="/posts" />  } </Route> 
                
 
                </Switch>
            </BrowserRouter>

        );
        
    }

    export default App;