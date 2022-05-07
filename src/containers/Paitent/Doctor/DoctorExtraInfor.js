import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtraInfor.scss';
import { getSchedleDoctorByDate } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';

import { FormattedMessage } from 'react-intl';

class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false,

        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }

    }

    showHideDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status
        })
    }

    render() {
        let { isShowDetailInfor } = this.state;
        return (
            <div className="doctor-extra-infor-container">
                <div className="content-up">
                    <div className="text-address">ĐỊA CHỈ KHÁM</div>
                    <div className="name-clinic">Bệnh viện ABC</div>
                    <div className="detail-address">30/4 Ninh Kiều, Cần Thơ</div>
                </div>

                <div className="content-down">
                    {isShowDetailInfor === false &&
                        <div className ="short-infor">
                            GIÁ KHÁM: 150.000đ.
                            <span
                                onClick={() => this.showHideDetailInfor(true)}>
                                Xem chi tiết
                            </span>
                        </div>

                    }
                    {isShowDetailInfor === true &&
                        <>
                            <div className="title-price">GIÁ KHÁM: </div>
                            <div className = "detal-infor">
                                <div className = "price">
                                    <span className = "left">Giá khám</span>
                                    <span className = "right">150.000đ</span>
                                </div>
                                
                                <div className = "note">Giá khám được ưu tiên</div>
                            </div>
                            <div className = "payment">Người bệnh có thể thanh toán và thẻ</div>
                            <div className = "hide-price">
                                <span
                                    onClick={() => this.showHideDetailInfor(false)}>
                                    Ẩn bảng giá
                                </span>
                            </div>
                        </>
                    }
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
