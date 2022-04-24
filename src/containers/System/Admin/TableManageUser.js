import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from "../../../store/actions";

class TableManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userRedux: [],
        }
    }

    componentDidMount() {
        this.props.fetchUserRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                userRedux: this.props.listUsers,
            })
        }
    }

    handleDeleteUser = (user) => {
        this.props.deleteUser(user.id)
    }

    handleEditUser = (user) => {
        // console.log('edit user', user)
        this.props.handleEditUserFromParent(user)
    }

    render() {
        // console.log('check all user: ', this.props.listUsers);
        // console.log('check state: ', this.state.userRedux)
        let arrUsers = this.state.userRedux;
        return (
            <table id="TableManageUser">
                <tbody>
                    <tr>
                        <th>Email</th>
                        <th>FullName</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                    {arrUsers && arrUsers.length > 0 &&
                        arrUsers.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.email}</td>
                                    <td>{item.fullName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button 
                                        onClick={() => this.handleEditUser(item)}
                                        className="btn-edit" ><i className="fas fa-pencil-alt"></i></button>
                                        <button 
                                        onClick={() => this.handleDeleteUser(item)}
                                        className="btn-delete"><i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            )
                        })
                    }



                </tbody>
            </table>
        );
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deleteUser: (id) => dispatch(actions.deleteUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
