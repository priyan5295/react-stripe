//sk_test_51PMQzE03DZVnzjSRtSxkdtdRcpMYFGqyz4eXcuUklo1GZmybGU00a8R6SFyxXNJF5CwfiNN1yfGmvyCNEnRZh1dQ00vSM84Vmh
// 1st attempt
// import express from 'express';
// import cors from 'cors';
// const express = require('express')
// var cors = require('cors')
// const stripe = require('stripe')('sk_test_51PMQzE03DZVnzjSRtSxkdtdRcpMYFGqyz4eXcuUklo1GZmybGU00a8R6SFyxXNJF5CwfiNN1yfGmvyCNEnRZh1dQ00vSM84Vmh')

// 2nd attempt

import express from 'express';
import cors from 'cors';
import stripeModule from 'stripe';

const stripe = stripeModule('sk_test_51PMQzE03DZVnzjSRtSxkdtdRcpMYFGqyz4eXcuUklo1GZmybGU00a8R6SFyxXNJF5CwfiNN1yfGmvyCNEnRZh1dQ00vSM84Vmh');

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());


app.post("/checkout", async (req, res) => {
    console.log("request datasss", req.body)
    const items = req.body.items;
    let lineItems = [];

    //check if items exist and are in the correct format
    if(!items || Array.isArray(items)){
        return res.status(400).send({ error: 'Invalid items format'});
    }

    // construct line items for Stripe
    items.forEach((item) => {
        if(item.id && item.quantity){
            lineItems.push({
                price: item.id,
                quantity: item.quantity
            });
        } else {
            return res.status(400).send({error: 'Item must have id and quantity'})
        }        
    });

    console.log('line-items', lineItems);

    try {

        // Create a checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items : lineItems,
            mode: 'payment',
            success_url: "https://react-stripe.onrender.com/success",
            cancel_url: "https://react-stripe.onrender.com/cancel"
        });

        console.log('session cretaed', session)


        // Send the session URL as the response
        res.send(JSON.stringify({
            url: session.url
        }));

    } catch(error) {
        console.error('Error creating Stripe session:', error);
        res.status(500).send({ error: error.message });
    }
});

// GET method to retrieve checkout session details
app.get("/checkout/:sessionId", async (req, res) => {
    const sessionId = req.params.sessionId;

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        res.send(session);
    } catch (error) {
        console.error('Error retrieving Stripe session:', error);
        res.status(500).send({ error: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));