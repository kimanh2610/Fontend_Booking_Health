import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from "../../utils/emitter";
import _ from 'lodash';

class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            fullName: '',
            address: '',
        }
    }

    componentDidMount() {
        let user = this.props.currentUser;
        //let {currentUser} = this.props;
        if(user && !_.isEmpty(user)){
            this.setState({
                id: user.id,
                email: user.email,
                password: 'harcode',
                fullName: user.fullName,
                address: user.address,
            })
        }
        console.log('mouting modal', this.props.currentUser)
    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    handleOnChangeInput = (event, id) => {
        // this.state[id] = event.target.value;
        // this.setState({ 
        //     ...this.state
        // }, () => { 
        //     console.log('check', this.state)
        // })

        let copyState = { ...this.state };
        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        }, () => {
            // console.log('check', this.state);

        });
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'fullName', 'address'];

        for (let i = 0; i < arrInput.length; i++) {
            // console.log('check inside loop', this.state[arrInput[i]], arrInput[i]);
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            //call api edit user modal
            this.props.editUser(this.state);

        }
    }

    render() {
        console.log('check props from parent', this.props)
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-user-container'}
                size="lg"

            >
                <ModalHeader toggle={() => { this.toggle() }}>Edit a user</ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Email</label>
                            <input
                                type="text"
                                onChange={(event) => this.handleOnChangeInput(event, "email")}
                                value={this.state.email}
                                disabled
                            />
                        </div>

                        <div className="input-container">
                            <label>Password</label>
                            <input
                                type="password"
                                onChange={(event) => this.handleOnChangeInput(event, "password")}
                                value={this.state.password}
                                disabled
                            />
                        </div>

                        <div className="input-container">
                            <label>fullName</label>
                            <input
                                type="text"
                                onChange={(event) => this.handleOnChangeInput(event, "fullName")}
                                value={this.state.fullName}
                            />
                        </div>

                        <div className="input-container max-width-input">
                            <label>Address</label>
                            <input
                                type="text"
                                onChange={(event) => this.handleOnChangeInput(event, "address")}
                                value={this.state.address}
                            />
                        </div>


                    </div>

                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        className="px-3"
                        onClick={() => { this.handleSaveUser() }}>
                        Save Changes</Button>{' '}
                    <Button color="secondary" className="px-3" onClick={() => { this.toggle() }}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);




