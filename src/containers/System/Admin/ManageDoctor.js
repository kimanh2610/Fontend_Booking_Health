import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import './ManageDoctor.scss';
import * as actions from "../../../store/actions";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { LANGUAGES } from '../../../utils';
import { getDetailInforDoctor } from '../../../services/userService';
import { CRUD_ACTIONS } from '../../../utils';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //save to markdown table
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
            listDoctors: [],
            hasOldData: false,

            //save to doctor_infor table
            listPrice: [],
            listPayment: [],
            selectedPrice: '',
            selectedPayment: '',
            nameClinic: '',
            addressClinic: '',
            note: ''
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.getRequiredDoctorInfor();
    }

    buildDataInputSelect = (inputData, type) => {
        let results = [];
        let { language } = this.props
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = type === 'USERS' ? `${item.fullName}` : item.valueVi;
                let labelEn = type === 'USERS' ? `${item.fullName}` : item.valueEn;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                results.push(object);
            })
        }
        return results;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS')
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }

        if(prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor){
            let {resPayment, resPrice} = this.props.allRequiredDoctorInfor;

            let dataSelectPrice = this.buildDataInputSelect(resPrice);
            let dataSelectPayment = this.buildDataInputSelect(resPayment);

            console.log('check data new:', dataSelectPrice, dataSelectPayment)
            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
            })
            
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state;
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE
        })
    }

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
        let res = await getDetailInforDoctor(selectedDoctor.value)
        if (res && res.infor.errCode === 0 && res.infor.data && res.infor.data.Markdown) {
            let markdown = res.infor.data.Markdown;
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false
            })
        }
        //console.log(`Option selected:`, res);

    };

    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }
    render() {
        //console.log('check state', this.state)
        let { hasOldData } = this.state;
        
        return (
            <div className="manage-doctor-container">
                <div className="manage-doctor-title">
                    <FormattedMessage id="admin.manage-doctor.title" />
                </div>

                <div className="more-infor">
                    <div className="content-left form-group">

                        <label>
                            <FormattedMessage id="admin.manage-doctor.select-doctor" />

                        </label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                            placeholder={'Chọn bác sĩ'}
                        />
                    </div>
                    <div className="content-right">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.introduction-infor" />

                        </label>
                        <textarea className="form-control" 
                            onChange={(event) => this.handleOnChangeDesc(event)}
                            value={this.state.description}
                        >

                        </textarea>
                    </div>
                </div>

                <div className="more-infor-extra row">
                    <div className="col-6 form-group">
                        <label>Chọn giá</label>
                        <Select
                            // value={this.state.selectedDoctor}
                            // onChange={this.handleChangeSelect}
                            options={this.state.listPrice}
                            placeholder={'Chọn giá'}
                        />
                    </div>

                    <div className="col-6 form-group">
                        <label>Chọn phương thức thanh toán</label>
                        <Select
                            //value={this.state.selectedDoctor}
                            // onChange={this.handleChangeSelect}
                            options={this.state.listPayment}
                            placeholder={'Chọn phương thức thanh toán'}
                        />
                    </div>

                    <div className="col-4 form-group">
                        <label>Tên phòng khám</label>
                        <input className="form-control"/>
                    </div>

                    <div className="col-4 form-group">
                        <label>Địa chỉ phòng khám</label>
                        <input className="form-control"/>
                    </div>

                    <div className="col-4 form-group">
                        <label>Lưu ý</label>
                        <input className="form-control"/>
                    </div>

                </div>

                <div className="manage-doctor-editor">
                    <MdEditor style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />

                </div>

                <button onClick={() => this.handleSaveContentMarkdown()}
                    className={hasOldData === true ? "save-content-doctor" : "create-content-doctor"}>
                    {hasOldData === true ?
                        <span>
                            <FormattedMessage id="admin.manage-doctor.save-infor" />

                        </span>
                        :
                        <span>
                            <FormattedMessage id="admin.manage-doctor.create-infor" />

                        </span>
                    }
                </button>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        getRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
