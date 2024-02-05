# eventplanner
Pet project to manage QR invitations and RSVPs for events


# Storage
Mongo DB used here https://cloud.mongodb.com/

# Deployment
https://dashboard.render.com/

# Flow
Input (Email, phone) -> Customized confirmation form -> Thanks and Tickets? QR
QR -> On the day confirmation


```mermaid
graph LR;
    /-->index.jade;
    index.jade-->/confirm;
    /confirm-- valid   --->confirm.jade;
    /confirm-- invalid --->index.jade;
    /confirm-- error --->error.jade;
    confirm.jade-->/thanks;
    /thanks -- user found ---> thanks.jade
    /thanks -- user not found ---> error.jade
    thanks.jade --> /download
```

# Ticket generation
Get a ticket template from here https://www.canva.com/ and put it under tickets/ with the name template.png