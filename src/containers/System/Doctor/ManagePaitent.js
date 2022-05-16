import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManagePaitent.scss';
import DatePicker from "../../../components/Input/DatePicker";


class ManagePaitent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: new Date()
        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    render() {
        return (
            <div className="manage-paitent-container">
                <div className="manage-paitent-title">
                    Quản lý bệnh nhân
                </div>
                <div className="manage-paitent-body row">
                    <div className="col-4 form-group">
                        <label>Chọn ngày khám:</label>
                        <DatePicker
                            className="form-control"
                            onChange={this.handleOnChangeDatePicker}
                            value={this.state.currentDate}

                        />
                    </div>
                    <div className="col-12 table-manage-paitent">
                        <table style={{ width: '100%', }}>
                            <tr>
                                <th>Company</th>
                                <th>Contact</th>
                                <th>Country</th>
                            </tr>
                            <tr>
                                <td>Alfreds Futterkiste</td>
                                <td>Maria Anders</td>
                                <td>Germany</td>
                            </tr>

                        </table>
                    </div>

                </div >
            </div >
        );

    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePaitent);
