const fs = require('fs');
const request = require('request');
const multiparty = require('multiparty');

const formParse = (obj, auth, uri) => {
  return new Promise((resolve, reject) => {
    // 그외 (application/json)
    let postData = {};
    for (let key in auth) {
      // 인증정보
      postData[key] = auth[key]
    }
    for (let key in obj.body) {
      // json데이터
      postData[key] = obj.body[key]
    }
    postData.uri = uri
    return resolve(postData)
  });
}

const postRequest = (data) => {

  // request 발송하기
  let postData = data

  let uri = data.uri
  // uri가 필요없는 변수 삭제
  delete postData.uri
  return new Promise((resolve, reject) => {

    request.post({
      uri: uri,
      method: 'POST',
      formData: postData
    }, function (e, r, body) {
      // request 발송

      let resData = JSON.parse(body)
      // res는 parse로 콜백
      if (!e && r.statusCode == 200) {
          console.log(resData)
        return resolve(resData)
      } else {
        return reject(new Error(e))
      }
    })
  });
}

const onError = (error) => {
  // 에러처리
  return new Promise((resolve, reject) => {
    return reject(new Error(error))
  });
}

const send = (obj, auth) => {
  // 문자보내기
  return formParse(obj, auth, 'https://apis.aligo.in/send/')
    .then(postRequest)
    .catch(onError)
}

const sendMass = (obj, auth) => {
  // 문자보내기 대량
  return formParse(obj, auth, 'https://apis.aligo.in/send_mass/')
    .then(postRequest)
    .catch(onError)
}

const list = (obj, auth) => {
  // 문자전송결과보기
  return formParse(obj, auth, 'https://apis.aligo.in/list/')
    .then(postRequest)
    .catch(onError)
}

const smsList = (obj, auth) => {
  // 문자전송결과보기 상세
  return formParse(obj, auth, 'https://apis.aligo.in/sms_list/')
    .then(postRequest)
    .catch(onError)
}

const remain = (obj, auth) => {
  // 문자발송가능건수
  return formParse(obj, auth, 'https://apis.aligo.in/remain/')
    .then(postRequest)
    .catch(onError)
}

const cancel = (obj, auth) => {
  // 문자예약취소
  return formParse(obj, auth, 'https://apis.aligo.in/cancel/')
    .then(postRequest)
    .catch(onError)
}

const token = (obj, auth) => {
  // 알림톡 토큰발행
  if (!obj.body.type || !obj.body.time) {
    return Promise.resolve({ code: 404, message: '토큰 유효기간은 필수입니다.' })
  } else {
    return formParse(obj, auth, `https://kakaoapi.aligo.in/akv10/token/create/${obj.body.time}/${obj.body.type}`)
      .then(postRequest)
      .catch(onError)
  }
}

const friendList = (obj, auth) => {
  // 알림톡 플러스친구리스트
  return formParse(obj, auth, 'https://kakaoapi.aligo.in/akv10/profile/list/')
    .then(postRequest)
    .catch(onError)
}

const profileAuth = (obj, auth) => {
  // 알림톡 플러스친구 인증받기
  return formParse(obj, auth, 'https://kakaoapi.aligo.in/akv10/profile/auth/')
    .then(postRequest)
    .catch(onError)
}

const profileCategory = (obj, auth) => {
  // 알림톡 플러스친구 프로필 카테고리
  return formParse(obj, auth, 'https://kakaoapi.aligo.in/akv10/category/')
    .then(postRequest)
    .catch(onError)
}

const profileAdd = (obj, auth) => {
  // 알림톡 플러스친구등록
  return formParse(obj, auth, 'https://kakaoapi.aligo.in/akv10/profile/add/')
    .then(postRequest)
    .catch(onError)
}

const templateList = (obj, auth) => {
  // 알림톡 템플릿리스트
  return formParse(obj, auth, 'https://kakaoapi.aligo.in/akv10/template/list/')
    .then(postRequest)
    .catch(onError)
}

const templateAdd = (obj, auth) => {
  // 알림톡 템플릿등록
  return formParse(obj, auth, 'https://kakaoapi.aligo.in/akv10/template/add/')
    .then(postRequest)
    .catch(onError)
}

const templateModify = (obj, auth) => {
  // 알림톡 템플릿수정
  return formParse(obj, auth, 'https://kakaoapi.aligo.in/akv10/template/modify/')
    .then(postRequest)
    .catch(onError)
}

const templateDel = (obj, auth) => {
  // 알림톡 템플릿삭제
  return formParse(obj, auth, 'https://kakaoapi.aligo.in/akv10/template/del/')
    .then(postRequest)
    .catch(onError)
}

const templateRequest = (obj, auth) => {
  // 알림톡 템플릿검수
  return formParse(obj, auth, 'https://kakaoapi.aligo.in/akv10/template/request/')
    .then(postRequest)
    .catch(onError)
}

const alimtalkSend = (obj, auth) => {
  // 알림톡 발송
  return formParse(obj, auth, 'https://kakaoapi.aligo.in/akv10/alimtalk/send/')
    .then(postRequest)
    .catch(onError)
}

const historyList = (obj, auth) => {
  // 알림톡 발송리스트
  return formParse(obj, auth, 'https://kakaoapi.aligo.in/akv10/history/list/')
    .then(postRequest)
    .catch(onError)
}

const historyDetail = (obj, auth) => {
  // 알림톡 발송리스트 상세
  return formParse(obj, auth, 'https://kakaoapi.aligo.in/akv10/history/detail/')
    .then(postRequest)
    .catch(onError)
}

const kakaoRemain = (obj, auth) => {
  // 알림톡 발송가능건수
  return formParse(obj, auth, 'https://kakaoapi.aligo.in/akv10/heartinfo/')
    .then(postRequest)
    .catch(onError)
}

const kakaoCancel = (obj, auth) => {
  // 알림톡 예약취소
  return formParse(obj, auth, 'https://kakaoapi.aligo.in/akv10/cancel/')
    .then(postRequest)
    .catch(onError)
}


module.exports = {
  send,
  sendMass,
  list,
  smsList,
  remain,
  cancel,
  token,
  friendList,
  profileAuth,
  profileCategory,
  profileAdd,
  templateList,
  templateAdd,
  templateModify,
  templateDel,
  templateRequest,
  alimtalkSend,
  historyList,
  historyDetail,
  kakaoRemain,
  kakaoCancel
}