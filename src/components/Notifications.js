import React from 'react';
import ReactNotifications from 'react-browser-notifications';
import { render } from 'react-dom';


class Notifications extends React.Component{
    constructor(){
        super();
        this.showNotifications = this.showNotifications.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }


    showNotifications() {
        // If the Notifications API is supported by the browser
        // then show the notification
        if(this.n.supported()) this.n.show();

    }

    handleClick(event){
        // Do something here such as
        console.log("Notification Clicked");
        // window.focus() OR
        //window.open("http://www.google.com");

        // Lastly, Close the notification
        this.n.close(event.target.tag);
    }

    render() {
        return(
            <div>
                <ReactNotifications 
                    onRef={ref =>(this.n = ref)}
                    title="Hey There!"
                    body="Your Fav Food Updated!!"
                    timeout="2000"
                    onClick={event => this.handleClick(event), this.showNotifications}
                />

            </div>
        )
    }
};

export default Notifications