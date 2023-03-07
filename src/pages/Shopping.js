import { Container, Form, Label, Input } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import React from "react";
import { useState } from "react";
import firebase from "../utils/firebase";


function Shopping(){
    const history = useHistory();
    const [pDate, setPdate] = React.useState('');
    const [pAmount, setPamount] = React.useState('');
    const [pWhere, setPwhere] = React.useState('');
    const [pNote, setPnote] = React.useState('');

    function onSubmit(){
        const documentRef = firebase.firestore().collection("purches").doc();

        documentRef.set({
            pDate: pDate,
            pWhere: pWhere,
            pAmount: parseFloat(pAmount) ,
            pNote: pNote,
            recordAt: firebase.firestore.Timestamp.now(),
            
        }).then(() => {


            setPdate('');
            setPwhere('');
            setPamount('');
            setPnote('');

            window.alert("存檔完成")

            history.push("/shopping");
        });
     };

    return(
        <Container>
            <Form onSubmit={onSubmit} >
            
                <Form.Input 
                placeholder="消費日期"
                value={pDate}
                onChange={(e => setPdate(e.target.value))} />

                <div>
                    <Input list='pwhere' placeholder="消費地點、公司"
                     value={pWhere}
                     onChange={(e => setPwhere(e.target.value))} />
                     <datalist id='pwhere'>
                        <option value='SaveWay'>SaveWay</option>
                        <option value='SuperStore'>SuperStore</option>
                        <option value='Costco'>Costco</option>  
                        <option value='Gas'>Gas</option> 
                                          
                    </datalist>
                </div>

                <Form.Input 
                labelPosition="right"
                type="text"
                placeholder="消費總金額"
                value={pAmount}
                onChange={(e => setPamount(e.target.value))} >
                    <Label basic>$</Label>
                    <input />
                    <Label>.00</Label>
                </Form.Input>
                <Form.Input 
                placeholder="消費內容摘要"
                value={pNote}
                onChange={(e => setPnote(e.target.value))} />

                <Form.Button>完成作業 存檔</Form.Button>

                    
                
            </Form>
        </Container>
        
    )
}

export default Shopping ;