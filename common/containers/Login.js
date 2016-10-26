import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Login extends React.Component{

    constructor(props) {
        super(props);
        this.handleLoginIn = this.handleLoginIn.bind(this);
        this.handleLoginOut = this.handleLoginOut.bind(this);
        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handleLoginAjax = this.handleLoginAjax.bind(this);

        this.handleLoginUser = this.handleLoginUser.bind(this);
        this.handleLoginMiniCart = this.handleLoginMiniCart.bind(this);
    }

    handleLoginUser(){
        $.post('/api/UI/POST/User',function(data){
            console.log(data)
        })
    }

    handleLoginMiniCart(){
        $.post('/api/UI/POST/MiniCart',function(data){
            console.log(data)
        })
    }

    handleLoginIn(){
        $.cookie('WCS_USERACTIVITY_6694002','6694002,10001,null,null,null,null,null,null,null,null,MBDOdqhK6L1SxwO2o01a4j4FngHPeNPd1fcoSQJQclrt50ZqUiaXaOXC3dILWCgOdc94fphbH440KT1zg8/BUwlAMk2cfR8/QRvp7ZLr0wiBZkobj82jDoi/U0SuEgklK/Yu/QN/CEOifR22zqVLOA==')
    }

    handleLoginOut(){
        $.cookie('WCS_USERACTIVITY_6694002',null)
    }

    handleLoginChange(){
        window.location.href="/"
    }


    handleLoginAjax(){
        $.post('/api/UI/POST/AJAX',{data:"data",paramsA:"Ajax"},function(data){
            console.log(data)
        })
    }


    componentWillMount() {

    }

    componentDidMount() {

    }

    render(){

        let Style = {
            width : "200px",
            height : "40px",
            "border" : "1px solid #000",
            "border-radius" : "8px",
            margin : "30px"
        }

        return(
            <div id="site">
                <input style={Style} type="button" value="Log In" onClick={this.handleLoginIn} />
                <input style={Style} type="button" value="Log Out" onClick={this.handleLoginOut} />
                <input style={Style} type="button" value="WEB In" onClick={this.handleLoginChange} />
                <input style={Style} type="button" value="Ajax" onClick={this.handleLoginAjax} />
                <input style={Style} type="button" value="WCS USER" onClick={this.handleLoginUser} />
                <input style={Style} type="button" value="WCS MINI CAER" onClick={this.handleLoginMiniCart} />

            </div>
        )
    }
}

export default connect()(Login)