import { FC, Fragment, useState, useEffect, useRef } from 'react';
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
import { getRequest, postRequest, getToken } from '../../system/api';

interface PostQuestionProps { }

const PostQuestion: FC<PostQuestionProps> = () => {
    //file upload
	const [files, setFiles] = useState([]);
  const { t, i18n } = useTranslation();
  
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [detailtext, setDetailtext] = useState<string>(null);

  const [category, setCategory] = useState<number>();

  const [dueDate, setDueDate] = useState(new Date());
  const [editTitle, setEditTitle] = useState<string>();
  const [editContext, setEditContext] = useState<string>();
  const [isUrgent, setIsUrgent] = useState<boolean>(false);
  const navigate = useNavigate();

  const filePondRef = useRef<FilePond>();
  const [issuedId, setIssuedId] = useState<number>();

  const [token, setToken] = useState<any>();

  useEffect(() => {
      const TokenSetter = async () => {
        const issuedToken = await getToken();
        setToken(issuedToken);
      }
      GetParamData();
      TokenSetter();
    }, []);

    const GetParamData = () => {
      const queryParams = new URLSearchParams(location.search);
      setDetailtext(queryParams.get('detailtext'));
      setCategory(parseInt(queryParams.get('id')))
      setIsLoaded(true);
    }

    const Summit = async () => {
      try {
        const result = await postRequest<any, any>(`ticketing/postinquiry/`, {
          "title":editTitle, "content":editContext, "requester":msalInstance.getActiveAccount().username,
          "duedate":dueDate, "urgent":isUrgent, "pic":null, "ref_":category
        })
        setIssuedId(result.id);
        if (files.length !== 0)
          await filePondRef.current.processFiles();
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
            <Card.Title>{`${t(detailtext)}`}</Card.Title>
          </Card.Header>
          <Card.Body>
            <Row className="mb-4">
              <Form.Label className="col-md-2">{`${t('Title')} :`}</Form.Label>
              <Col md={9}>
                <Form.Control type="text" onChange={(event) => setEditTitle(event.target.value)}/>
              </Col>
            </Row>
            <Row className="mb-4">
              <Form.Label className="col-md-2">{`${t('Work Type')} :`}</Form.Label>
              <Col md={9}>
                <Form.Control type="text" defaultValue={detailtext} readOnly />
                {/*<Select classNamePrefix="Select" options={questionList} placeholder='Electronics' onChange={(event) => setCategory(event)}/>*/}
              </Col>
            </Row>
            <Row>
              <Form.Label className="col-md-2 mb-4">{`${t('Content')} :`}</Form.Label>
              <Col md={9} className="mb-4">
                <SunEditor placeholder={t('Default Content')} height='300'  onChange={(content:string) => setEditContext(content)}/>
              </Col>
            </Row>
            <Row style={{alignItems:'center', justifyItems:'center'}}>
              <Form.Label className="col-md-2 mb-4">{`${t('Due Date')} :`}</Form.Label>
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
              <Form.Label className="col-md-2 mb-4">{`${t('Upload File')} :`}</Form.Label>
              <Col md={9}>
              <FilePond 
                  ref={filePondRef}
                  files={files} 
                  allowMultiple={true}
                  allowProcess={false}
                  instantUpload={false}
                  onupdatefiles={setFiles}
                  server={{
                  url: `http://localhost:7002/masterdata/`,
                  process: {
                    url: `filelist/upload/${issuedId}/${msalInstance.getActiveAccount().username}/`,
                    method: 'POST',
                    headers: {
                      Authorization: `Bearer ${token}`, // Bearer 토큰 설정
                    },
                  },
                }} 
                name="files"
                onprocessfile={(error, file) => {
                  if (error) {
                    console.error('File processing error:', error);
                  } else {
                    console.log('File processed successfully:', file);
                  }
                }}
                />
              </Col>
            </Row>
          </Card.Body>
          <Card.Footer>
            <Row>
              <Col md={2}></Col>
              <Col md={9}>
                <div className="btn btn-primary"  onClick={() => Summit()} >{`${t('Post')}`}</div>
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
