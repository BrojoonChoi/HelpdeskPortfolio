# 시스템 구성도

# 웹 페이지 기능
## SSO 로그인
![image](https://github.com/user-attachments/assets/3a538bd5-000a-4753-8fbd-a27501b6d410)

1. MS Azure SSO 로그인 인증

![image](https://github.com/user-attachments/assets/26c27150-0d95-4d80-a2d7-193958a6e7c5)

2. API 호출 전 Axios를 통한 Azure 토큰 전송

![image](https://github.com/user-attachments/assets/7e8df819-c0ae-42c7-a96a-ebbbbc5de83f)

3. 컨트롤러에서 백엔드 토큰 검증(Guard)


## 다국어 지원(i18next)
![image](https://github.com/user-attachments/assets/77304ea1-6545-45b7-8917-7075e74e7b64)

다국어 지원 기능, 사용 중 영어와 한국어 전환 가능


## 시스템 사용
### 대쉬보드
![image](https://github.com/user-attachments/assets/f3a10652-b79d-4be8-8b22-ea4022402ffe)

접수현황, 진행현황, 지연현황 등의 다양한 업무 현황을 트렌드 그래프로 시각화
또한 접수, 진행 중, 완료, 반려 비율을 파이 차트로 표현

### 헬프데스크 신규 접수
![01](https://github.com/user-attachments/assets/48aeb2b4-8a3d-40c8-a9a0-d9fbdb1a52a7)

1. 헬프데스크 접수 화면


![02](https://github.com/user-attachments/assets/d2d32179-17a5-4c38-bd2d-4915fa584a63)

2. 접수 유형을 클릭하여 상세 접수로 이동


![04](https://github.com/user-attachments/assets/0693e44c-6560-4caa-bc4f-1447d399e1b6)

3. 접수 게시글 작성

![image](https://github.com/user-attachments/assets/ef441859-e527-408d-ac31-7c56e40600ba)

4. Filepond를 통한 파일 업로드 프론트엔드 로직

![image](https://github.com/user-attachments/assets/cd07e8f9-a8dd-4d79-91be-87f27ca5d1f5)

5. 게시글 작성 후, 게시글 ID를 받아 API 호출

![image](https://github.com/user-attachments/assets/211920c7-1b4d-49fc-aa24-dee0ec4a4a49)

6. 파일 업로드 백엔드 로직

![05](https://github.com/user-attachments/assets/f5ec9c6b-b668-4ccd-a074-c136e09dc438)

7. 화면 이동, 대기자 수 증


### 헬프데스크 접수 현황
![06](https://github.com/user-attachments/assets/9c6c1d1a-216f-4419-9949-458500ec5182)

1. 티켓 리스트 관리 화면

![image](https://github.com/user-attachments/assets/67013079-ccf4-4e99-a94f-c94aef5d021f)

2. 상세 화면

![image](https://github.com/user-attachments/assets/b3c1ffaf-873e-4e70-84be-397c63f066eb)

3. 파일 다운로드 백엔드 로직

### 헬프데스크 관리자 페이지
![07](https://github.com/user-attachments/assets/32b97bff-e318-4545-91bf-2cb22d800120)

1. 기준정보 관리 화면


![08](https://github.com/user-attachments/assets/bebb96a8-68a5-4bd5-bdd6-1c44ae98c65f)

2. 상세 기준 정보 추가


![09](https://github.com/user-attachments/assets/c2503a9e-50e2-4b22-a4f0-9f20e04f531a)

3. 신규 질문 유형 추가 확인
