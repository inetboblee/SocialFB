    import React, { useState } from "react";
    import firebase from "../utils/firebase";
    import "firebase/compat/firestore";
    import { List } from "semantic-ui-react";
    import { Link, useLocation } from "react-router-dom";


    function Topics(){
        const location = useLocation();
        const urlSearchParams = new URLSearchParams(location.search) ;
        const currentTopic = urlSearchParams.get("topic");
        const [topics, setTopics] = React.useState([]);
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
        return (
            <List animated selection> {topics.map(topic => {
                return (
                    <List.Item 
                    key={topic.name} 
                    as={Link}
                    to={`/posts?topic=${topic.name}`}
                    active={ currentTopic === topic.name }
                    >
                        <h2>{topic.name}</h2>
                    </List.Item>
                )
            })}
            </List>
        )
     }

    export default Topics