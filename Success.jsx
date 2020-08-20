import React from 'react';
import Header from './Header';
import Footer from './Footer';
class Success extends React.Component {
    render() {
        return (
            <div>
                <Header/>
            <header><h2 >Thanks for updating Claim Details.</h2><h2>Your Claim Details have updated successfully.</h2><h2>Please contact us in case of further query</h2></header>
            <Footer/>
            </div>
        );
}
}
export default Success;