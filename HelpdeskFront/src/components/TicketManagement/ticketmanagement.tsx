import  { FC, Fragment, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Col, OverlayTrigger, ProgressBar, Row, Tooltip, Table, Tab, Nav, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import PageHeader from '../../layouts/layoutcomponents/PageHeader';
import { getRequest, postRequest } from '../../system/api';
import { useIsAuthenticated } from '@azure/msal-react';

interface RequestListProps {
    id:string,
    category:string,
    title:string,
    requester:string,
    pic:string,
    postdate:string,
    duedate:string,
    step:string,
}

const TicketManagement:FC<any> = () => {
    const [questionTitle, setQuestionTitle] = useState<any>();
    const { t, i18n } = useTranslation();
    const [questionList, setquestionList] = useState<any>(null);
    const islogin = useIsAuthenticated();
    const navigate = useNavigate();

    useEffect(() => {
        // GET 요청 예제
        const fetchData = async () => {
          try {
            const result = await getRequest<RequestListProps>(`/ticketmanagement/findlist/`);
            setquestionList(result);
          } catch (error) {
            console.error('GET 요청 실패:', error);
          }
        };
    
        fetchData();
      }, []);

    const GoToPost = (pParam:string) => {
        const queryString = new URLSearchParams({ id:pParam }).toString();
        navigate(`/ticketmanagement/detail?${queryString}`)
    }

    return (
        <Fragment>
            <PageHeader titles="Dashboard 01" active="Dashboard 01" items={['Home']}/>
            <Row>
                <div className='card'>
                    <div className='card-header'>
                        <h4>
                            {t('HelpDesk Ticket Management')}
                        </h4>
                    </div>
                    <div style={{display:"flex", flexDirection:"row", padding:'1.5rem', borderBlockEnd:'1px solid #e9edf4', width:'100%'}}>
                        <Col style={{textAlign:"center"}} md={1}>{t('Seq')}</Col>
                        <Col style={{textAlign:"center"}} md={1}>{t('Category')}</Col>
                        <Col style={{textAlign:"center", cursor:"pointer"}} md={5} >{t('Title')}</Col>
                        <Col style={{textAlign:"center"}} md={2}>{t('Requester')}</Col>
                        <Col style={{textAlign:"center"}} md={1}>{t('Request Date')}</Col>
                        <Col style={{textAlign:"center"}} md={1}>{t('Due Date')}</Col>
                        <Col style={{textAlign:"center"}} md={1}>{t('Current Step')}</Col>
                    </div>
                    <div className='pb-0 card-body' style={{padding:'1.5rem'}}>
                        {
                            questionList === null ? <div></div> :
                            questionList.map((item:RequestListProps, index) => {return (
                                <li className='d-sm-flex' key={`${item.id}n${index}`} style={{paddingBottom:"0.5rem", marginBottom:"0.5rem", borderBlockEnd:'1px solid #e9edf4'}}>
                                    <Col md={1} style={{textAlign:"center"}}>{item.id}</Col>
                                    <Col md={1} style={{textAlign:"center"}}>{item.category}</Col>
                                    <Col md={5} style={{cursor:"pointer", paddingLeft:"3rem", paddingRight:"3rem"}} onClick={() => GoToPost(`${item.id}`)}>{item.title}</Col>
                                    <Col md={2} style={{textAlign:"center"}}>{item.requester}</Col>
                                    <Col md={1} style={{textAlign:"center"}}>{item.postdate}</Col>
                                    <Col md={1} style={{textAlign:"center"}}>{item.duedate}</Col>
                                    <Col md={1} style={{textAlign:"center"}}>{item.step}</Col>
                                </li>
                            )})
                        }
                    </div>
                </div>
            </Row>
        </Fragment>
    )
}

export default TicketManagement