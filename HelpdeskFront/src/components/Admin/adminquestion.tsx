import  { FC, Fragment, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Col, Form, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import PageHeader from '../../layouts/layoutcomponents/PageHeader';
import { getRequest, postRequest, patchRequest } from '../../system/api';
import { useIsAuthenticated } from '@azure/msal-react';
import { colors } from 'react-select/dist/declarations/src/theme';
import { PlusButton, MinusButton, ClassicButton } from '../Common/CommonButton';
import { isCancel } from 'axios';

interface AdminProps { }

interface QnAJsonProps {
    id:number,
    seq:number,
    keytext:string,
    isChanged?:boolean | null
}

interface QnADetailJsonProps {
    id:number,
    seq:number,
    ref_:number,
    detailtext:string,
    isChanged?:boolean | null,
}

const Admin_Question:FC<AdminProps> = () => {
    const [questionTitle, setQuestionTitle] = useState<string>("　");
    const { t, i18n } = useTranslation();
    const [questionList, setQuestionList] = useState<QnAJsonProps[]>(null);
    const [questionDetailList, setQuestionDetailList] = useState<QnADetailJsonProps[]>(null);
    const [clickedId, setClickedId] = useState<number>();
    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isEditingDetail, setIsEditingDetail] = useState<boolean>(false);

    useEffect(() => {
        // GET 요청 예제
        const fetchData = async () => {
          try {
            const result = await getRequest<QnAJsonProps[]>(`/ticketing/findlist`);
            setQuestionList(result);
          } catch (error) {
            console.error('GET 요청 실패:', error);
          }
        };
    
        fetchData();
      }, []);
    
    const ClickEditDetail = (pId:number, pKeytext:string) => {
        const fetchData = async () => {
            const result = await getRequest<QnADetailJsonProps[]>(`/ticketing/finddetail/${pId}`);
            setQuestionDetailList(result);
        }
        fetchData();
        setQuestionTitle(pKeytext);
        setClickedId(pId);
        if (isEditing === true)
            setIsEditing(false);
    }

    const GoToPost = (pParam:string) => {
        const queryString = new URLSearchParams({ detailtext: pParam }).toString();
        navigate(`/qna/postquestion?${queryString}`)
    }

    const Save = async () => {
        const Patch = async (item) => {
            await patchRequest<any, QnAJsonProps>(`/masterdata/ticketlist/modify`, {
                "id":item.id,
                "seq":item.seq,
                "keytext":item.keytext
            })
        }

        await questionList.map((item) => {
            if (item.isChanged === true) {
                try {
                    Patch(item)
                } catch (error) {
                    console.error('Error saving content:', error);
                    alert('Failed to save content.');
                }
            }
        })

        alert(t('Saveing is done.'));
        window.location.reload();
    }

    const ChangeKeytext = (pId:number, pKeytext:string) => {
        setQuestionList(
            (prevList) => prevList.map((item) => (item.id === pId ? 
                {id:item.id, seq:item.seq, keytext:pKeytext, isChanged:true} 
                : item))
        )
    }
    
    const ChangeSeq = (pId:number, pSeq:number) => {
        setQuestionList(
            (prevList) => prevList.map((item) => (item.id === pId ? 
                {id:item.id, seq:pSeq, keytext:item.keytext, isChanged:true} 
                : item))
        )
    }

    const AddLine = () => {
        if (isEditing === true) {
            alert(t('Can not add multiple lines at one time.'));
            return;
        }
        const newLine = { id:9999, seq:1, keytext:'newLine' };
        setQuestionList([...questionList, newLine]);
        setIsEditing(true);
    }
    
    const SaveDetail = async () => {
        const Patch = async (item) => {
            await patchRequest<any, QnADetailJsonProps>(`/masterdata/ticketlist/modify/${clickedId}`, {
                "id":item.id,
                "seq":item.seq,
                "ref_":item.ref_,
                "detailtext":item.detailtext
            })
        }

        await questionDetailList.map((item) => {
            if (item.isChanged === true) {
                try {
                    Patch(item)
                } catch (error) {
                    console.error('Error saving content:', error);
                    alert('Failed to save content.');
                }
            }
        })

        alert(t('Saveing is done.'));
    }

    const ChangeKeytextDetail = (pId:number, pDetailtext:string) => {
        setQuestionDetailList(
            (prevList) => prevList.map((item) => (item.id === pId ? 
                {id:item.id, seq:item.seq, detailtext:pDetailtext, ref_:clickedId, isChanged:true} 
                : item))
        )
    }
    
    const ChangeSeqDetail = (pId:number, pSeq:number) => {
        setQuestionDetailList(
            (prevList) => prevList.map((item) => (item.id === pId ? 
                {id:item.id, seq:pSeq, detailtext:item.detailtext, ref_:clickedId, isChanged:true} 
                : item))
        )
    }

    const AddLineDetail = () => {
        if (isEditingDetail === true) {
            alert(t('Can not add multiple lines at one time.'));
            return;
        }
        const newLine = { id:9999, seq:1, detailtext:'newLine', ref_:clickedId, isChanged:true };
        setQuestionDetailList([...questionDetailList, newLine]);
        setIsEditingDetail(true);
    }

    return (
        <Fragment>
            <PageHeader titles="Dashboard 01" active="Dashboard 01" items={['Home']}/>
            <Row>
                <Col md={6}>
                    <div style={{display:'flex', marginBottom:'1rem'}}>
                        {PlusButton({text:'Add', onClick:(AddLine) })}
                        {ClassicButton({text:'Save', onClick:(Save) })}
                    </div>
                    <div className='card'>
                        <div className='card-header'>
                            <h2>
                            {t('Inquiry Type Master Data')}
                            </h2>
                        </div>
                        <div className='pb-0 card-body' style={{height:'30rem', overflowY:'auto', marginBottom:'10px'}}>
                            <Row style={{marginBottom:'1rem'}}>
                                <Col md={2} style={{paddingLeft:'2rem'}}>
                                    {t('Seq')}
                                </Col>
                                <Col style={{paddingLeft:'2rem'}}>
                                    {t('Title')}
                                </Col>
                            </Row>
                            {
                                questionList === null ? <div></div> :
                                questionList.map((item:QnAJsonProps, index) => {return (
                                    <Row style={{marginBottom:'0.5rem'}}>
                                        <Col md={2}>
                                            <Form.Control type="number" defaultValue={item.seq} key={`${item.id}_${item.seq}_${index}`}
                                            onChange={(event) => ChangeSeq(item.id, parseInt(event.target.value))}
                                            />
                                        </Col>
                                        <Col md={7}>
                                            <Form.Control type="text" defaultValue={item.keytext} key={`${item.id}_${index}`}
                                            onChange={(event) => ChangeKeytext(item.id, event.target.value)}
                                            />
                                        </Col>
                                        <Col>
                                            <div className='btn btn-default' onClick={() => ClickEditDetail(item.id, item.keytext)}>
                                                {t('Detail Modify')}
                                            </div>
                                        </Col>
                                    </Row>
                                )})
                            }
                        </div>
                    </div>
                </Col>
                <Col md={6}>
                    <div style={{display:'flex', marginBottom:'1rem'}}>
                        {PlusButton({text:'Add', onClick:(AddLineDetail) })}
                        {ClassicButton({text:'Save', onClick:(SaveDetail) })}
                    </div>
                    <div className='card'>
                        <div
                            className="card-header"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                            }}
                        >
                            <Row>
                                <h4>{t('Inquiry Type Detail Master Data')}</h4>
                            </Row>
                            <Row style={{ display: 'flex', alignItems: 'flex-start' }}>
                                <h5 style={{ margin: 0, textAlign: 'left' }}>{`${t(questionTitle)}`}</h5>
                            </Row>
                        </div>
                            <div className='pb-0 card-body' style={{height:'30rem', overflowY:'auto', marginBottom:'10px'}}>
                                <Row style={{marginBottom:'1rem'}}>
                                    <Col md={2} style={{paddingLeft:'2rem'}}>
                                        {t('Seq')}
                                    </Col>
                                    <Col style={{paddingLeft:'2rem'}}>
                                        {t('Title')}
                                    </Col>
                                </Row>
                                {
                                    questionDetailList === null ? <div></div> :
                                    questionDetailList.map((item:QnADetailJsonProps, index) => {return (
                                        <Row style={{marginBottom:'0.5rem'}}>
                                            <Col md={2}>
                                                <Form.Control type="number" defaultValue={item.seq} key={`${item.id}_${item.seq}`}
                                                onChange={(event) => ChangeSeqDetail(item.id, parseInt(event.target.value))}
                                                />
                                            </Col>
                                            <Col>
                                                <Form.Control type="text" defaultValue={item.detailtext} key={`${item.id}`}
                                                onChange={(event) => ChangeKeytextDetail(item.id, event.target.value)}
                                                />
                                            </Col>
                                        </Row>
                                    )})
                                }
                            </div>
                    </div>
                </Col>
            </Row>
        </Fragment>
    )
}

export default Admin_Question