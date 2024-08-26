import { FC, Fragment, useState, useEffect } from 'react';
import { Card, Col, Form, Row } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PageHeader from '../../layouts/layoutcomponents/PageHeader';
import Select from 'react-select';
import { msalInstance } from '../../main';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import SunEditor from 'suneditor-react';
import SunEditorCore from "suneditor/src/lib/core";
import "suneditor/dist/css/suneditor.min.css";

import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import { useTranslation } from 'react-i18next';
import { getRequest, postRequest } from '../../system/api';

interface PostQuestionProps { }
interface PostCondition { key:string }

const PostQuestion: FC<PostQuestionProps> = (pParam:PostCondition) => {
    //file upload
	const [files] = useState([]);
  const { t, i18n } = useTranslation();
  const [questionList, setquestionList] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [keytext, setKeytext] = useState<string>(null);
  const [category, setCategory] = useState<string>();
  const [dueDate, setDueDate] = useState(new Date());
  const [editTitle, setEditTitle] = useState<string>();
  const [editContext, setEditContext] = useState<string>();
  const [isUrgent, setIsUrgent] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
      // GET 요청 예제
      const fetchData = async () => {
        try {
          const result = await getRequest<any>(`/ticketing/findlist/${i18n.language}`);
          setquestionList(result);
        } catch (error) {
          console.error('GET 요청 실패:', error);
        }
      };
  
      fetchData();
      FindDetail();
    }, []);

    const FindDetail = () => {
      const queryParams = new URLSearchParams(location.search);
      setKeytext(queryParams.get('keytext'));
      setIsLoaded(true);
    }

    const Summit = async () => {
      try {
        await postRequest<any, any>(`ticketing/postinquiry/`, {
          "category":keytext, "title":editTitle, "content":editContext, "requester":msalInstance.getActiveAccount().username,
          "duedate":dueDate, "urgent":isUrgent, "pic":null
        })
        alert(t('Request is posted.'));
        navigate(`/qna/`)
      } catch (error) {
        console.error('Error saving content:', error);
        alert('Failed to save content.');
      }
    }
  
  return (
  <Fragment>
    <PageHeader titles={t('Inquiry')} active="Add Product" items={['E-Commerce']} />
    {!isLoaded ? <div>Loading...</div> : 
    <Row>
      <Col lg={12}>
        <Card>
          <Card.Header>
            <Card.Title>{`${t(keytext)}`}</Card.Title>
          </Card.Header>
          <Card.Body>
            <Row className="mb-4">
              <Form.Label className="col-md-3">{`${t('Title')} :`}</Form.Label>
              <Col md={9}>
                <Form.Control type="text" onChange={(event) => setEditTitle(event.target.value)}/>
              </Col>
            </Row>
            <Row className="mb-4">
              <Form.Label className="col-md-3">{`${t('Work Type')} :`}</Form.Label>
              <Col md={9}>
                <Form.Control type="text" value={keytext} readOnly />
                {/*<Select classNamePrefix="Select" options={questionList} placeholder='Electronics' onChange={(event) => setCategory(event)}/>*/}
              </Col>
            </Row>
            <Row>
              <Form.Label className="col-md-3 mb-4">{`${t('Content')} :`}</Form.Label>
              <Col md={9} className="mb-4">
                <SunEditor placeholder={t('Default Content')} height='300'  onChange={(content:string) => setEditContext(content)}/>
              </Col>
            </Row>
            <Row style={{alignItems:'center', justifyItems:'center'}}>
              <Form.Label className="col-md-3 mb-4">{`${t('Due Date')} :`}</Form.Label>
              <Col md={4}>
                <DatePicker selected={dueDate} onChange={(date) => setDueDate(date)} 
                className="form-control"
                dateformat="yyyy-mm-dd"/>
              </Col>
              <Col md={2} style={{display:'flex', flexDirection:'row', alignItems:'center', alignContent:'center', justifyItems:'center', justifyContent:'center'}}>
                <label >{`${t('Urgent')} : `}</label>
                <input style={{marginLeft: '0.5rem', marginBlockEnd: '0.5rem'}} type='checkbox' onChange={(event) => setIsUrgent(event.target.checked)} />
              </Col>
              <Col md={1} >
              </Col>
            </Row>
            <Row>
              <Form.Label className="col-md-3 mb-4">{`${t('Upload File')} :`}</Form.Label>
              <Col md={9}>
            <FilePond files={files} allowMultiple={true} maxFiles={3} server="/api" name="files" />
              </Col>
            </Row>
          </Card.Body>
          <Card.Footer>
            <Row>
              <Col md={3}></Col>
              <Col md={9}>
                <Link to="#" className="btn btn-primary"  onClick={() => Summit()} >{`${t('Post')}`}</Link>
                <Link to="/qna" className="btn btn-default float-end">{`${t('Cancel')}`}</Link>
              </Col>
            </Row>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
    }
  </Fragment>
); };
export default PostQuestion;
