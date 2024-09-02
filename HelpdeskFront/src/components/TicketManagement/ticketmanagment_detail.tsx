import { FC, Fragment, useState, useEffect } from 'react';
import PageHeader from '../../layouts/layoutcomponents/PageHeader';
import { Link } from 'react-router-dom';
import { Row, Col, Card, ListGroup, Badge, OverlayTrigger, Tooltip, Button, Dropdown } from 'react-bootstrap';

import { getRequest, handleDownload } from '../../system/api';
import { useTranslation } from 'react-i18next';

interface TicketManagementDetailProps { }

interface InquiryListProps {
  id:number, ref_:number, title:string, content:string, requester:string,
  pic:string, duedate:Date, urgent:boolean, step:number, detailtext:string,
  postdate:Date
}

interface FileListProps {
  id:number, filename:string, uploadedfile:Buffer, size:number;
}

const TicketManagementDetail: FC<TicketManagementDetailProps> = () => {
  const [inquiryData, setInquiryData] = useState<InquiryListProps>();
  const [fileList, setFileList] = useState<FileListProps[]>();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fetchData = async (pId) => {
      try {
        const result = await getRequest<InquiryListProps[]>(`/ticketmanagement/finddetail/${pId}`);
        setInquiryData(result[0]);
        const fileList = await getRequest<FileListProps[]>(`/ticketmanagement/findfilelist/${pId}`);
        setFileList(fileList);
      } catch (error) {
        console.error('GET 요청 실패:', error);
      }
    };
    
    fetchData(GetParamData());
  }, []);

  const GetParamData = () => {
    const queryParams = new URLSearchParams(location.search);
    return (queryParams.get('id'));
  }

  /*
  const Summit = async () => {
    try {
      await postRequest<any, any>(`ticketing/postinquiry/`, {
        "title":editTitle, "content":editContext, "requester":msalInstance.getActiveAccount().username,
        "duedate":dueDate, "urgent":isUrgent, "pic":null, "ref_":category
      })
      alert(t('Request is posted.'));
      navigate(`/qna/`)
    } catch (error) {
      console.error('Error saving content:', error);
      alert('Failed to save content.');
    }
  }
  */
  return (
      <div className=''>
        {!inquiryData ? <div>loading...</div> :
        <div>
          <PageHeader titles={t('HelpDesk Ticket Management')} active="Email-Read" items={['Pages']} />
          <Row>
            <Col xl={9}>
              <Card>
                <Card.Header style={{flexDirection:'column', alignItems:'flex-start'}}>
                  <small className="me-3 mt-3 text-muted">{t('Title')}</small>
                  <Card.Title as='h3'>{`${inquiryData.title}`}</Card.Title>
                </Card.Header>
                <Card.Body>
                  <div className="email-media" style={{borderBlockEnd:'1px solid $e9edf4'}}>
                    <div className="mt-0 d-sm-flex">
                      <div className="media-body pt-0 overflow-visible">
                        <Row>
                          <Col>
                            <small className="mb-0">{t('Requester')}</small>
                            <div className="media-title text-dark font-weight-semibold mt-1">Name <span className="text-muted font-weight-semibold">{`(${inquiryData.requester})`}</span></div>
                          </Col>
                          <Col>
                            <small className="mb-0">{t('Request Date')}</small>
                            <div className="media-title text-dark font-weight-semibold mt-1">{`${inquiryData.postdate}`}</div>
                          </Col>
                          <Col>
                            <small className="mb-0">{t('Due Date')}</small>
                            <div className="media-title text-dark font-weight-semibold mt-1">{`${inquiryData.duedate}`}</div>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </div>
                  <div className="eamil-body mt-5">
                    <small className="mb-0">{t('Content')}</small>
                    <div dangerouslySetInnerHTML={{__html:inquiryData.content}}/>
                    <div className="email-attch">
                      <h6 className="font-weight-semibold">3 Attachments <Link to={`${import.meta.env.BASE_URL}filemanager/filedetails/`}>View</Link></h6>
                    </div>
                    <Row className="attachments-doc">
                      {
                        !fileList ? <div></div> :
                        fileList.map((file, index) => {
                          return(
                            <Col xl={3} lg={3} md={4} sm={4} className="mb-2 mb-sm-0" key={"item_"+index}>
                              <div className="border overflow-hidden p-0 br-7" onClick={() => handleDownload(file.id, file.filename)} style={{cursor:'pointer'}}>
                                <div className="p-3 text-center" >
                                <p>{`${file.filename}`}</p>
                                <p className="text-muted.ms-2 mb-0 fs-11">{`(${file.size / 1024 > 1024 ? (Math.round((file.size / 1048576)).toString() + "MB") : (Math.round((file.size / 1024)).toString() + "KB")})`}</p>
                                </div>
                              </div>
                            </Col>
                        )})
                      }
                    </Row>
                  </div>
                </Card.Body>
                <Card.Footer>
                  
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </div>
      }
    </div>
  )
};

export default TicketManagementDetail;
