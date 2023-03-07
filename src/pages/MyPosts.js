 //import Topics from "../components/Topics"
 import React from "react";
 import firebase from "../utils/firebase";
 import "firebase/compat/firestore";  
 import { Item } from "semantic-ui-react" 
 import Post from "../components/post";
 
 function MyPosts() {
     //conponent 通常是 導入、函數
     //函數先做常數 const 宣告，  再做函數內容 function 
     //然後開始 return 渲染網頁

     //const常數設定
     const [posts, setPosts] =React.useState([]);

     //function函數內容
     React.useEffect(()=>{
         firebase.firestore().collection("posts")
                .where("author.uid" , "==" , firebase.auth().currentUser.uid )
                 .get().then((collectionSnapahot)=>{
                     const data = collectionSnapahot.docs.map(docSnapshot => {
                         const id = docSnapshot.id;
                         return { ...docSnapshot.data(), id };
                     })
                     setPosts(data);
         });

     }, [])

     //return網頁渲染，引用 conponent Post
     return (
                     <Item.Group>
                         {posts.map(post =>{
                         return <Post post={post} key={postMessage.id} />
                         })}
                     </Item.Group>
     )
 }

 export default MyPosts