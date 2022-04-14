import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';


class About extends Component {

    render() {

        return (
            <div className="section-share section-about">
                <div className="section-about-header">
                    Truyền thông nói về đăng ký khám bệnh trực tuyến
                </div>
                <div className="section-about-content">
                    <div className="content-left">
                        <iframe width="100%" height="400px"
                            src="https://www.youtube.com/embed/D_2vdlZZNZg"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                        </iframe>
                    </div>
                    <div className="content-right">
                        <p>Cùng với tình hình dịch bệnh ngày càng phức tạp hiện nay thì việc đặt lịch khám trực tuyến thông qua hệ thống là một giải pháp
                            thông minh. Bệnh nhân có thể đặt lịch khám 24/7 ở mọi lúc chỉ
                            cần có thiết bị internet. Sau đó, sẽ có nhân viên phòng khám xác
                            nhận thông tin khách hàng và thông báo lịch khám cụ thể.</p>
                    </div>

                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
