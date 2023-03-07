    //import Topics from "../components/Topics"
    import React from "react";
    import firebase from "../utils/firebase";
    import "firebase/compat/firestore";  
    import { Waypoint } from 'react-waypoint';
    import { Item } from "semantic-ui-react" ;
    import { useLocation } from "react-router-dom";
    import Post from "../components/post";
    
    function Posts() {
        const location = useLocation();
        const urlSearchParams = new URLSearchParams(location.search) ;
        const currentTopic = urlSearchParams.get("topic");
        //conponent 通常是 導入、函數
        //函數先做常數 const 宣告，  再做函數內容 function 
        //然後開始 return 渲染網頁

        //const常數設定
        const [posts, setPosts] =React.useState([]);
        const lastPostSnapshotRef = React.useRef();

        //function函數內容
        React.useEffect(()=>{
            if (currentTopic){
                firebase.firestore().collection("posts")
                        .where("topic", "==", currentTopic)
                        .orderBy('createAt', 'desc')
                        // .limit(2)
                        //限制每次瀏覽器讀文筆數，增加瀏覽效率
                        .get().then((collectionSnapahot)=>{
                            const data = collectionSnapahot.docs.map(docSnapshot => {
                                const id = docSnapshot.id;
                                return { ...docSnapshot.data(), id };
                            });
                            // lastPostSnapshotRef.current =
                            //  collectionSnapahot.docs[collectionSnapahot.docs.length - 1];
                            //每次列表限制筆數時，要考慮抓到最後一筆，作為添加參考
                            setPosts(data);  });
            } else{
                firebase.firestore().collection("posts")
                        .orderBy('createAt', 'desc')
                        // .limit(2)
                        .get().then((collectionSnapahot)=>{
                            const data = collectionSnapahot.docs.map(docSnapshot => {
                                const id = docSnapshot.id;
                                return { ...docSnapshot.data(), id };
                            });
                            // lastPostSnapshotRef.current = 
                            //   collectionSnapahot.docs[collectionSnapahot.docs.length - 1];
                            setPosts(data);  });
        };
        }, [currentTopic])
        

        //return網頁渲染，引用 conponent Post
        return (
                        <Item.Group>
                            
                            {posts.map(post => {
                                return <Post post={post} key={post.id}  />
                            })}
                        </Item.Group>

                        /* <Waypoint onEnter={()=> {
                            if (lastPostSnapshotRef.current){
                            if (currentTopic){
                                firebase.firestore().collection("posts")
                                        .where("topic", "==", currentTopic)
                                        .orderBy('createAt', 'desc')
                                        .startAfter(lastPostSnapshotRef.current)
                                        .limit(2)
                                        .get().then((collectionSnapahot)=>{
                                            const data = collectionSnapahot.docs.map(docSnapshot => {
                                                const id = docSnapshot.id;
                                                return { ...docSnapshot.data(), id };
                                            })
                                            setPosts(...posts, ...data);  });
                                            //新加入的筆數，添加在已經瀏覽的資料尾端
                            } else{
                                firebase.firestore().collection("posts")
                                        .orderBy('createAt', 'desc')
                                        .startAfter(lastPostSnapshotRef.current)
                                        .limit(2)
                                        .get().then((collectionSnapahot)=>{
                                            const data = collectionSnapahot.docs.map(docSnapshot => {
                                                const id = docSnapshot.id;
                                                return { ...docSnapshot.data(), id };
                                            })
                                            setPosts(...posts, ...data);  });
                            };
                            }} 
                            }
                            /> */
                    )
    }

    export default Posts