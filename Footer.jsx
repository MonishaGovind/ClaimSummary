import React from 'react';

class Footer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            date: new Date().getFullYear()
          };
    }
    render() {
        return(
            <footer><div>Copyrights @ {this.state.date} </div> </footer>
        );
    }
}
export default Footer;