    import { Grid, Item, 
        Image, Icon, Container,
        Header, Segment, Comment, Form  } from "semantic-ui-react"  ;
    import { useParams } from "react-router-dom";
    import Topics from "../components/Topics";
    import firebase from "../utils/firebase";
    import React from "react";


    function Post(){

        const { postId } = useParams();
        const [post, setPost] = React.useState({
            author: {},
        });
        const [commentContent, setCommentContent] = React.useState("");
        const [isLoading, setIsloding] = React.useState(false);  
        const [comments, setComments] = React.useState([]);  



        React.useEffect(()=>{
            firebase.firestore()
            .collection("posts").doc(postId)
            .onSnapshot((docSnapshot)=>{
                const data = docSnapshot.data();
                setPost(data);
            });
            //用 get() 只取得一次資料， 改用 onSnapshot  可以有監聽的效果!!
            //
            // .get().then((docSnapshot)=>{
            //     const data = docSnapshot.data();
            //     setPost(data);
            // })
        },[])

        React.useEffect(()=>{
            firebase.firestore()
            .collection("posts").doc(postId)
            .collection('comments').orderBy('createAt', 'desc')
            .onSnapshot((collectionSnapshot)=>{
                const data = collectionSnapshot.docs.map(doc => {
                    return doc.data();
                 })
                 //console.log(data);
                 setComments(data);
            });
         },[]);

        function toggle(isActive, field){
            const uid = firebase.auth().currentUser.uid;
            firebase.firestore().collection('posts').doc(postId).update({
                [field]: isActive
                        ? firebase.firestore.FieldValue.arrayRemove(uid) 
                        : firebase.firestore.FieldValue.arrayUnion(uid) ,
            });

            // if (isActive){
            //     firebase.firestore().collection('posts').doc(postId).update({
            //         [field]: firebase.firestore.FieldValue.arrayRemove(uid) ,
            //     });

            // } else {
            //     firebase.firestore().collection('posts').doc(postId).update({
            //         [field]: firebase.firestore.FieldValue.arrayUnion(uid) ,
            //     });

            // };
            
        };

        // function toggleCollected(){
        //     const uid = firebase.auth().currentUser.uid;
        //     if (iscollected){
        //         firebase.firestore().collection('posts').doc(postId).update({
        //             collectedBy: firebase.firestore.FieldValue.arrayRemove(uid) ,
        //         });

        //     } else {
        //         firebase.firestore().collection('posts').doc(postId).update({
        //             collectedBy: firebase.firestore.FieldValue.arrayUnion(uid) ,
        //         });

        //     };
            
        // };

        // function togglelikeed(){
        //     const uid = firebase.auth().currentUser.uid;
        //     if (isliked){
        //         firebase.firestore().collection('posts').doc(postId).update({
        //             likedBy: firebase.firestore.FieldValue.arrayRemove(uid) ,
        //         });

        //     } else {
        //         firebase.firestore().collection('posts').doc(postId).update({
        //             likedBy: firebase.firestore.FieldValue.arrayUnion(uid) ,
        //         });

        //     };
            
        // };

        const isCollected = post.collectedBy?.includes(firebase.auth().currentUser.uid);

        const isliked = post.likedBy?.includes(firebase.auth().currentUser.uid);

        function onSubmit(){
            setIsloding(true);
            const fbft = firebase.firestore();
            //簡化 常用句 firebase.firestore()
            const batch = fbft.batch();

            const postRef = fbft.collection('posts').doc(postId)

            batch.update(postRef, {
                commentCount: firebase.firestore.FieldValue.increment(1),
            } );

            const commentRef = postRef.collection('comments').doc();
            batch.set(commentRef, {
                content: commentContent,
                createAt: firebase.firestore.Timestamp.now(),
                author:{
                    uid: firebase.auth().currentUser.uid,
                    displayName:firebase.auth().currentUser.displayName || '',
                    photoURL:firebase.auth().currentUser.photoURL || '',
                },
            });

            batch.commit().then(()=>{
                setCommentContent('');
                setIsloding(false);

            }) ;  //全部的修改一次送出，如果有錯不會部分修改
        };

        return (
<>
                        {post.author.photoURL ? (
                                            <Image src={post.author.photoURL} avatar />
                                        ) : (
                                            <Icon name="user circle" />  
                                        )}
                        {post.topic}/{post.author.displayName || '帳號名稱未顯示'}
                        
                        <Header>
                        {post.title}
                            <Header.Subheader>
                                {post.topic} . {post.createAt?.toDate().toLocaleDateString()}
                            </Header.Subheader>
                        

                        </Header>
                        <Image src={post.imageUrl || "https://react.semantic-ui.com/images/wireframe/image.png" } size="medium"  />
                        
                        <Segment basic vertical>
                            {post.content}
                        </Segment>
                        <Segment basic vertical>
                            留言 {post.commentCount || 0 } ....收藏文章人數 {post.collectedBy?.length || 0} ....讚 {post.likedBy?.length || 0}
                            <Icon name={`thumbs up${isliked ? '' : ' outline'}`} 
                                  color={isliked ?  "blue" : "grey"}
                                  link onClick={()=> toggle(isliked, 'likedBy')} />

                            <Icon name={`bookmark${isCollected ? '' : ' outline'}`}
                                  color={isCollected ? "blue" : "grey"}
                                  link onClick={()=> toggle(isCollected, 'collectedBy')} />
                        </Segment>

                        <Comment.Group>
                            <Form reply >
                                <Form.TextArea 
                                value={commentContent} 
                                onChange={(e)=> setCommentContent(e.target.value)} />

                                <Form.Button 
                                onClick={onSubmit}
                                loading={isLoading} >留言</Form.Button>

                            </Form>
                            <Header>共 {post.commentCount || 0} 則留言</Header>
                            {comments.map((comment) =>{
                                return (
                                    <Comment>
                                        
                                        <Comment.Avatar src={comment.author.photoURL || ''}  />
                                        <Comment.Content>
                                            <Comment.Author as="span" >{comment.author.displayName || '帳號名稱未顯示' }</Comment.Author>
                                            <Comment.Metadata> {comment.createAt?.toDate().toLocaleString()}  </Comment.Metadata>
                                            <Comment.Text> {comment.content} </Comment.Text> 
                                        </Comment.Content>
                                    </Comment>

                                );
                            })}
                            
                        </Comment.Group>
</>
        )
    }

    export default Post;
