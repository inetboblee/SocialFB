import { Container, Header, Form, Image, Button } from "semantic-ui-react";
import React, { useState } from "react";
import firebase from "../utils/firebase";
import { useHistory } from "react-router-dom";

import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, Font } from '@react-pdf/renderer';
import font from '../images/kaiu.ttf'

// Register font
Font.register({ family: 'kaiu', src: font });
//Font.register({ family: 'FangSong', src: FangSongNormal });


// Create styles
const styles = StyleSheet.create({
    page: {
      fontFamily: 'kaiu',
      backgroundColor: '#94fbe5'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
      
    },
    first: {
        fontSize: 30,
        fontFamily: 'SanJiKaiShu-2',
      }
    
    });
  
  

function ServiceFor() {
    const history = useHistory();
    const [cusName, setCusName] = React.useState('');
    const [cusAddress, setCusAddress] = React.useState('');
    const [serviceItem, setServiceItem] = React.useState('');
    const options = [{
        text: "佛前點燈",
        value: "K",},{
        text: "拜懺",
        value: "B",
    }]

    // Create Document Component
  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
        <Text>ServiceItem : {serviceItem} {__dirname}</Text>
            <Text> 收 據 </Text>
           <Text>姓名 :{cusName}</Text>
           <Text>住址 : {cusAddress}</Text>
        </View>
        <View style={styles.section}>
          
        </View>
      </Page>
    </Document>
  );

    function onSubmit(){
        //const documentRef = firebase.firestore().collection("services").doc();

//要加一個先查詢，有沒有重複名字

    //     documentRef.set({
    //         cusName: cusName ,
    //         cusAddress: cusAddress
    //     }).then(() => {
    //         history.push("/svc");
    //     });
    // }
        console.log({__dirname});
        ReactPDF.renderToFile(<MyDocument />, `${__dirname}/example.pdf`);
        }
    

    return (
        <Container>
            <Header>定期法會、法事</Header>
            <Form onSubmit={onSubmit} >
                <Form.Dropdown 
                placeholder="選擇服務項目"
                    options={ options }
                    selection
                    value={serviceItem}
                    onChange={(e => setServiceItem(e.target.value))}
                    

                />
                <Form.Input 
                    placeholder="請輸入姓名"
                    value={cusName}
                    onChange={(e => setCusName(e.target.value))}
                     />
                <Form.Input 
                    placeholder="請輸入住址"
                    value={cusAddress}
                    onChange={(e => setCusAddress(e.target.value))}
                     />


                <Form.Button>完成作業 存檔</Form.Button>

            </Form>
            <PDFDownloadLink document={<MyDocument />} fileName="SAMPLE">
                {({loading, error}) => (loading ? <button>loading document...</button> : <button>Download</button>)}
                </PDFDownloadLink>
            
            
        </Container>
    
    )
}

export default ServiceFor ;