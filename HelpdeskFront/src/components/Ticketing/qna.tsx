import  { FC, Fragment, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Col, OverlayTrigger, ProgressBar, Row, Tooltip, Table, Tab, Nav, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import PageHeader from '../../layouts/layoutcomponents/PageHeader';
import { getRequest, postRequest } from '../../system/api';
import { useIsAuthenticated } from '@azure/msal-react';

interface QnAProps { }

interface QnAJsonProps {
    id:number,
    keytext:string
}

interface QnADetailJsonProps {
    id:number,
    keytext:string,
    detailtext:string
}

const QnA:FC<QnAProps> = () => {
    const [questionTitle, setQuestionTitle] = useState<any>();
    const { t, i18n } = useTranslation();
    const [questionList, setquestionList] = useState<QnAJsonProps[]>(null);
    const [questionDetailList, setQuestionDetailList] = useState<QnADetailJsonProps[]>(null);
    const [waitingQueue, setWaitingQueue] = useState<number>(undefined);
    const navigate = useNavigate();
    

    useEffect(() => {
        // GET 요청 예제
        const fetchData = async () => {
          try {
            const result = await getRequest<QnAJsonProps[]>(`/ticketing/findlist`);
            //const result = await getRequest<QnAJsonProps>(`/ticketing/findlist/${i18n.language}`);
            setquestionList(result);
          } catch (error) {
            console.error('GET 요청 실패:', error);
          }
        };
    
        fetchData();
      }, []);

    const ClickQnA = (pParam:QnAJsonProps) => {
        const fetchData = async () => {
            const result = await getRequest<QnADetailJsonProps[]>(`/ticketing/finddetail/${pParam.id}`);
            //const result = await getRequest<QnAJsonProps>(`/ticketing/finddetail/${pParam.keytext}?lang=${i18n.language}`);
            setQuestionDetailList(result);
            
            const queue = await getRequest<number>(`/ticketing/findwaitingqueue/${pParam.id}`);
            setWaitingQueue(queue);
        }
        fetchData();
        setQuestionTitle(pParam.keytext);
    }

    const GoToPost = (pId:string) => {
        const queryString = new URLSearchParams({ id: pId }).toString();
        navigate(`/qna/postquestion?${queryString}`)
    }

    return (
        <Fragment>
            <PageHeader titles="Dashboard 01" active="Dashboard 01" items={['Home']}/>
            {/* left side */}
            <Row>
                <Col>
                    <div className='card'>
                        <div className='card-header'>
                            <h4>
                            {t('HelpDesk 질문하기')}
                            </h4>
                        </div>
                        <div className='pb-0 card-body'>
                            <ul className='task-list'>
                                {
                                    questionList === null ? <div></div> :
                                    questionList.map((item:QnAJsonProps, index) => {return (
                                    <li className='d-sm-flex' style={{cursor:"pointer"}} key={`${item.keytext}${index}`} onClick={() => ClickQnA(item)}>
                                        {t(item.keytext)}
                                    </li>
                                )})
                            }
                            </ul>
                        </div>
                    </div>
                </Col>
            {/* right side */}
                <Col>
                    <div className='card'>
                        <div className='card-header'>
                            <h4>
                                {questionTitle === undefined ? t('helpdeskempty') : questionTitle}
                            </h4>
                        </div>
                        <div className='pb-0 card-body'>
                            <ul className='task-list'>
                                {
                                    questionDetailList === null ? <div /> :
                                    questionDetailList.map((item:QnADetailJsonProps, index) => {return (
                                    <li className='d-sm-flex' style={{cursor:"pointer"}} key={`${item.keytext}${index}`} onClick={() => GoToPost(item.id)}>
                                        {t(item.detailtext)}
                                    </li>
                                )})
                            }
                            </ul>
                            {waitingQueue === undefined ? <div></div> :
                            <Row>
                                <div className='d-block d-sm-flex mt-4 align-items-center'>
                                    {`현재 대기 중인 인원 : ${waitingQueue}}명`}
                                </div>
                            </Row>
                            }
                            {"　"}
                        </div>
                    </div>
                </Col>
            </Row>
        </Fragment>
    )
}

export default QnA