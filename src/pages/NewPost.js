    import { Container, Header, Form, Image, Button } from "semantic-ui-react";
    import React, { useState } from "react";
    import "firebase/compat/firestore";
    import "firebase/compat/storage"
    import firebase from "../utils/firebase";
    import { useHistory } from "react-router-dom";

    
    function NewPost(){
        const [title, setTitle] = React.useState('');
        const [content, setContent] = React.useState('');
        const [topics, setTopics] = React.useState([]);
        const [topicName, setTopicName] = React.useState('');
        const [showInput, setShowInput] = React.useState(false);
        const [file, setFile] = React.useState(null);
        const [isPhotoUrl, setIsPhotoUrl] = useState('');
        const history = useHistory()
        const [isLoading, setIsloding] = React.useState(false);  
        //https://react.semantic-ui.com/images/wireframe/image.png

        React.useEffect( () => {
            firebase
            .firestore()
            .collection("topics")
            .get()
            .then( (collectionSnapahot) => {
              const data = collectionSnapahot.docs.map( (doc) => {
                        return doc.data();
                    } );
                    //console.log(data)
                    setTopics(data);
                } );
        },[] );

        const options = topics.map( (topic) => {
            return {
                text: topic.name,
                value: topic.name,
            };
        });

        const previewUrl = file
            ? URL.createObjectURL(file)
            : "https://react.semantic-ui.com/images/wireframe/image.png" ;


        function onSubmit(){
            setIsloding(true);
            const documentRef = firebase.firestore().collection("posts").doc();

            const fileRef = firebase.storage().ref('post-images/' + documentRef.id);
            const metadata = {
                contentType: file.type
            };
            fileRef.put(file, metadata).then( () => {
                fileRef.getDownloadURL().then((imageUrl)=>{
                    documentRef.set({
                        title: title,
                        content: content,
                        topic: topicName,
                        createAt: firebase.firestore.Timestamp.now(),
                        author: {
                            displayName:firebase.auth().currentUser.displayName || "",
                            photoURL:firebase.auth().currentUser.photoURL || '',
                            uid:firebase.auth().currentUser.uid,
                            email:firebase.auth().currentUser.email
                        },
                        imageUrl,
                    }).then( () => {
                        setIsloding(false);
                        history.push("/posts");
                    })

                })
            })

            
        }


        return (
            <Container>
                <Header>發表文章 <p color="blue" >請先選擇主題</p> </Header>

                <Form onSubmit={onSubmit}>


                <Form.Dropdown 
                        
                        placeholder="選擇文章主題"
                        options={options}
                        selection
                        value={topicName}
                        onChange={(e,{ value }) => {
                            setShowInput(true);
                            setTopicName(value)}
                    }
                    />
                    {showInput && <Form.Input 
                        placeholder="輸入文章標題"
                        value={title}
                        onChange={(e => setTitle(e.target.value))}
                         /> }

                    {showInput && <Form.TextArea 
                        placeholder="輸入文章內容"
                        value={content}
                        onChange={(e => setContent(e.target.value))}
                         /> }
                    
                    
                    
                    

                    <>
                    <Button  basic as="label" htmlFor="post-image" >上傳文章圖片</Button> 
                    
                    <Form.Button loading={isLoading} floated="right">送出文章</Form.Button>
                    </>
                    
                    <Image 
                    src= {previewUrl}
                    size="midium"  
                    floted="left" />

                    
                    <Form.Input type="file" 
                    id="post-image" 
                    style={{ display: "none"}} 
                    onChange={(e) => setFile(e.target.files[0])} />
                </Form>
            </Container>
        )
    }
    export default NewPost;