import { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface ButtonProps {
  text: string;
  onClick: () => void;
}

export const PlusButton: FC<ButtonProps> = ({ text, onClick }) => {
  const { t } = useTranslation();

  return (
    <div
      className='btn btn-primary'
      style={{
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        marginLeft: '1rem',
        height:'2.5rem'
      }}
      onClick={onClick}
    >
      <div
        style={{
          fontWeight: '800',
          fontSize: '1.5rem',
          paddingRight: '4px',
        }}
      >
        +
      </div>
      <div style={{ fontSize: '1rem' }}>
        {`${t(text)}`}
      </div>
    </div>
  );
};

export const MinusButton: FC<ButtonProps> = ({ text, onClick }) => {
  const { t } = useTranslation();

  return (
    <div
      className='btn btn-primary'
      style={{
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        marginLeft: '1rem',
        height:'2.5rem'
      }}
      onClick={onClick}
    >
      <div
        style={{
          fontWeight: '800',
          fontSize: '1.5rem',
          paddingRight: '4px',
        }}
      >
        -
      </div>
      <div style={{ fontSize: '1rem' }}>
        {`${t(text)}`}
      </div>
    </div>
  );
};

export const ClassicButton: FC<ButtonProps> = ({ text, onClick }) => {
  const { t } = useTranslation();

  return (
    <div
      className='btn btn-primary'
      style={{
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        marginLeft: '1rem',
        height:'2.5rem'
      }}
      onClick={onClick}
    >
      <div style={{ fontSize: '1rem' }}>
        {`${t(text)}`}
      </div>
    </div>
  );
};
