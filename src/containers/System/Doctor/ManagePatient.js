import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManagePatient.scss';
import DatePicker from "../../../components/Input/DatePicker";
import { getListPatientForDoctor } from "../../../services/userService"
import moment from 'moment';

class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: []
        }
    }

    async componentDidMount() {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formateDate = new Date(currentDate).getTime();
        this.getDataPatient(user, formateDate);

    }

    getDataPatient = async (user, formateDate) => {
        let res = await getListPatientForDoctor({
            doctorId: user.id,
            date: formateDate
        })
        if (res && res.infor.errCode === 0) {
            this.setState({
                dataPatient: res.infor.data
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, () => {
            let { user } = this.props;
            let { currentDate } = this.state;
            let formateDate = new Date(currentDate).getTime();
            this.getDataPatient(user, formateDate);
        })
    }

    handleBtnConfirm = () => {

    }

    handleBtnRemedy = () => {
        
    }
    render() {
        console.log('check state', this.state)
        let { dataPatient } = this.state;
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
                            <tbody>
                                <tr>
                                    <th>STT</th>
                                    <th>Thời gian:</th>
                                    <th>Họ và tên:</th>
                                    <th>Địa chỉ:</th>
                                    <th>Giới tính:</th>
                                    <th>Actions</th>
                                </tr>
                                {dataPatient && dataPatient.length > 0 ?
                                    dataPatient.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.timeTypeDataPatient.valueVi}</td>
                                                <td>{item.patientData.fullName}</td>
                                                <td>{item.patientData.address}</td>
                                                <td>{item.patientData.genderData.valueVi}</td>
                                                <td>
                                                    <button className="btn-confirm"
                                                        onClick={() => this.handleBtnConfirm}
                                                    >
                                                        Xác nhận
                                                    </button>
                                                    <button className="btn-remedy"
                                                        onClick={() => this.handleBtnRemedy}
                                                    >
                                                        Gửi hóa đơn
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    :
                                    <tr>
                                        No data
                                    </tr>
                                }

                            </tbody>
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
        user: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
